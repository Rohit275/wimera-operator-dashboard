import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private _snackbar: MatSnackBar) {}
  durationInSeconds = 3;
  ngOnInit(): void {}
  onLogin(form: NgForm) {
    if (
      form.value.UName == 'admin' &&
      form.value.Role == 'admin' &&
      form.value.Password == 'admin'
    ) {
      this._snackbar.open('Login Successful!', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
      });
      console.log('Logging in', form.value);
      this.router.navigate(['/home']);
    } else {
      this._snackbar.open('Login Failed!', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
      });
      console.log('Wrong Username or password');
    }
  }
}
