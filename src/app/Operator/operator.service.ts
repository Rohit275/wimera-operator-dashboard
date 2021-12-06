import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperatorService {
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  roles: any = [];
  private rolesUpdated = new Subject<any[]>();
  constructor(private http: HttpClient) {}
  ngInit() {}

  getRoleUpdateListener() {
    return this.rolesUpdated.asObservable();
  }

  getCells() {
    var val = 'Operator';
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/getoperatorvalues',
        val
      )
      .subscribe((respData) => {
        console.log(respData);
        this.roles = respData;
        this.rolesUpdated.next(this.roles.cell);
        console.log('Roles Fetched Successfully');
      });
  }
}
