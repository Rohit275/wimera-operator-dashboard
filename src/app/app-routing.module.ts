import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCellsComponent } from './admin/cells/add-cells/add-cells.component';
import { CellListComponent } from './admin/cells/cell-list/cell-list.component';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { SheetComponent } from './sheet/sheet/sheet.component';
import { OpDashboardComponent } from './Operator/op-dashboard/op-dashboard.component';
import { OperatorLayoutComponent } from './layout/operator-layout.component';
import { NavbarComponent } from './Operator/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'admin/sheet',
        component: SheetComponent,
      },
      { path: 'admin/dashboard', component: DashboardComponent },
      { path: 'admin/role', component: RoleListComponent },
      {
        path: 'admin/addRole',
        component: AddRoleComponent,
      },
      { path: 'admin/cell', component: CellListComponent },
      { path: 'admin/addCell', component: AddCellsComponent },
    ],
  },
  {
    path: '',
    component: OperatorLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'operator/dashboard/:uname',
        component: NavbarComponent,
      },
      { path: '', component: NavbarComponent },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
