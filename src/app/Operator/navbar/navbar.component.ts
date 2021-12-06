import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
  RouterEvent,
} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDropdown: boolean = false;
  DropDown: any[] = [{ value: 'Logout' }];
  id;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // var val;
    // this.router.events.subscribe((event: RouterEvent) => {
    //   if (event instanceof NavigationEnd) {
    //     val = this.route.snapshot.queryParamMap.get('uname');
    //     console.log(val, this.route.snapshot.queryParamMap);
    //   }
    //   val = parseInt(this.route.snapshot.queryParamMap.get('uname'));
    //   console.log(
    //     'Inside router events',
    //     val,
    //     this.route.snapshot.queryParamMap
    //   );
    // });
  }

  ngOnInit(): void {
    var val;
    console.log('After router :', val);
  }

  onProfile() {
    this.authService.logout();
  }
  onSubmenu() {
    // this.isDropDown=!this.isDropDown;
    this.isDropdown = !this.isDropdown;
  }
}
