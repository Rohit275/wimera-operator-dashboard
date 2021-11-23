import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MachineListComponent } from './machines/machine-list/machine-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'machine', component: MachineListComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'role', component: RoleListComponent },
  { path: 'addRole', component: AddRoleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'first', component: MachineListComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
