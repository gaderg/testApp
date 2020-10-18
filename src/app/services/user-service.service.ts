import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  /* URL created through npm json server */
  /* 'json-server --watch db.json' hit command and start json server as a database for local */
  url = 'http://localhost:3000/userList';

  constructor(private httpUser: HttpClient) {}

  /* Upadate data on post call */
  private _refreshData = new Subject<any>();
  get refershData() {
    return this._refreshData;
  }
  /* Get User Data */
  getUserData(): Observable<any> {
    return this.httpUser.get<any>(this.url);
  }
  /* Post User Data */
  addUser(product): Observable<any> {
    return this.httpUser.post<any>(this.url + '/', product).pipe(
      tap(() => {
        this._refreshData.next();
      })
    );
  }
}
