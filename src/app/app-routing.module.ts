import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCellsComponent } from './admin/cells/add-cells/add-cells.component';
import { CellListComponent } from './admin/cells/cell-list/cell-list.component';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { MachineListComponent } from './machines/machine-list/machine-list.component';
import { OperatorComponent } from './user/operator/operator.component';
import { SheetComponent } from './machines/sheet/sheet.component';
// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     canActivate: [AuthGuard],
//     pathMatch: 'full',
//   },
//   // { path: '', redirectTo: '/login', pathMatch: 'full' },
//
//   {
//     path: 'machine',
//     component: MachineListComponent,
//     canActivate: [AuthGuard],
//   },{
//     path: 'home',
//     component: HomeComponent,
//     canActivate: [AuthGuard],
//     pathMatch: 'full',
//   },
//   { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'role', component: RoleListComponent, canActivate: [AuthGuard] },
//   { path: 'addRole', component: AddRoleComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   // { path: 'first', component: MachineListComponent },
//   { path: '**', redirectTo: '' },
// ];

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'machine',
        component: MachineListComponent,
      },
      {
        path: 'sheet',
        component: SheetComponent,
      },
      { path: 'operator', component: OperatorComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'role', component: RoleListComponent },
      {
        path: 'addRole',
        component: AddRoleComponent,
      },
      { path: 'cell', component: CellListComponent },
      { path: 'addCell', component: AddCellsComponent },

      // { path: 'login', component: LoginComponent },
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
