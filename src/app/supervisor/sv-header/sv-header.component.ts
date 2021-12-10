import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sv-header',
  templateUrl: './sv-header.component.html',
  styleUrls: ['./sv-header.component.css'],
})
export class SvHeaderComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  Logout = 'Logout';
  isDropdown: boolean = false;
  DropDown: any[] = [{ value: 'Logout' }];
  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onProfile() {
    this.authService.logout();
  }

  onSubmenu() {
    this.isDropdown = !this.isDropdown;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }
}
