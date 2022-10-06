import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSearch'
})
export class CustomSearchPipe implements PipeTransform {

  transform(records: any[], filterObj: object, defaultFilter?: boolean) {
    if (!filterObj || !records) {
      return records;
    } else {
      const filterKeys = Object.keys(filterObj);
      if (defaultFilter) {
        return records.filter(
          (record: any) => {
            filterKeys.reduce(
              (x, keyName) => (x && new RegExp(filterObj[keyName], 'gi')
              .test(record[keyName])) || filterObj[keyName] === '', true
            );
          }
        );
      } else {
        return records.filter((record: any) => {
          return filterKeys.some((keyName: any) => {
            return new RegExp(filterObj[keyName], 'gi')
            .test(record[keyName]) || filterObj[keyName] === '';
          });
        });
      }
    }
  }

}
