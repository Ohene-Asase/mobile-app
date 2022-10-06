import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      }
      const intervals = {
        y: 31536000,
        m: 2592000,
        w: 604800,
        d: 86400,
        h: 3600,
        min: 60,
        s: 1
      };
      let counter;
      // tslint:disable-next-line: forin
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + '' + i; // singular (1 day ago)
          } else {
            return counter + '' + i; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }

}
