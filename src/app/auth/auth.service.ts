import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  Userid;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {}

  login(user) {
    console.log('User in Login', user);
    this.http
      .post('http://localhost:3000/api/users/login', user)
      .subscribe((resp) => {
        //console.log(resp);
        this.Userid = resp;
        console.log('User Id :', this.Userid);
        if (!this.Userid) {
          return;
        } else {
          console.log(this.Userid);
          var role = this.Userid.RoleName;
          if (role == 'Admin') {
            this.loggedIn.next(true);
            this.router.navigate(['/dashboard']);
          } else if (role == 'Operator') {
            this.loggedIn.next(true);
            this.router.navigate(['/operator']);
          }
        }
      });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
