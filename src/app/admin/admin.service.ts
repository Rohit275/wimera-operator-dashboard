import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private users: any = [];
  private usersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, public router: Router) {}

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUsers() {
    this.http
      .get<{ message: string; users: any }>(
        'http://localhost:3000/api/users/getroles'
      )
      .pipe(
        map((userData) => {
          console.log('User data admin: ', userData.users);
          console.log(userData.message);
          return userData.users;
        })
      )
      .subscribe((userData) => {
        this.users = userData;
        this.usersUpdated.next([...this.users]);
      });
  }

  addUser(data, cells) {
    const user = data;
    const cell = cells;
    console.log('ADD USER: ', user);
    this.http
      .post<{ message: string }>('http://localhost:3000/api/users/addrole', {
        data,
        cell,
      })
      .subscribe((respData) => {
        console.log(respData);
        this.usersUpdated.next([...this.users]);
      });
  }
}
