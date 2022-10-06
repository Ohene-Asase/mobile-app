import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isArray, isObject } from 'underscore';

export class BaseService<T> {

  constructor(public http: HttpClient, public model: string) { }

  get() {
    return this.http.get<T[]>(`${environment.baseApi}/${this.model}`).toPromise();
  }

  find(id: number) {
    return this.http.get<T>(`${environment.baseApi}/${this.model}/find?id=${id}`).toPromise();
  }

  info(id: number) {
    return this.http.get<T>(`${environment.baseApi}/${this.model}/info?id=${id}`).toPromise();
  }

  query(filter: any) {
    return this.http.get<T[]>(`${environment.baseApi}/${this.model}/query?${this.getQueryString(filter)}`).toPromise();
  }

  save(record: T) {
    if ((<any>record).id) {
      return this.http.put<number>(`${environment.baseApi}/${this.model}`, this.refactorObj(record)).toPromise();
    } else {
      return this.http.post<number>(`${environment.baseApi}/${this.model}`, this.refactorObj(record)).toPromise();
    }
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.baseApi}/${this.model}/${id}`).toPromise();
  }

  protected getQueryString(filter: object) {
    const queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
    }).join('&');

    return queryString;
  }

  protected refactorObj(obj: Object) {
    Object.keys(obj).forEach(prop => {
      const propValue = obj[prop];
      if (propValue === null) { delete obj[prop]; }
      else if (isArray(propValue)) { obj[prop] = propValue.map((i) => this.refactorObj(i)); }
      else if (isObject(propValue)) { obj[prop] = this.refactorObj(propValue); }
    });
    return obj;
  }

}
