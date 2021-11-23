import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MachineListComponent } from './machines/machine-list/machine-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'machine', component: MachineListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'roleList', component: RoleListComponent },
  { path: 'first', component: MachineListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
