import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MachineListComponent } from './machines/machine-list/machine-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MachineFileImportComponent } from './machines/machine-file-import/machine-file-import.component';
import { HomeComponent } from './home/home.component';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MachineCreateComponent } from './machines/machine-create/machine-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MachineEditComponent } from './machines/machine-edit/machine-edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OperatorComponent } from './user/operator/operator.component';
import { EditRoleComponent } from './admin/role/edit-role/edit-role.component';
import { CellListComponent } from './admin/cells/cell-list/cell-list.component';
import { AddCellsComponent } from './admin/cells/add-cells/add-cells.component';
import { EditCellsComponent } from './admin/cells/edit-cells/edit-cells.component';
import { SheetComponent } from './machines/sheet/sheet.component';
import { StepperImportComponent } from './machines/stepper-import/stepper-import.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MachineListComponent,
    DashboardComponent,
    MachineCreateComponent,
    MachineEditComponent,
    MachineFileImportComponent,
    HomeComponent,
    AddRoleComponent,
    RoleListComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    OperatorComponent,
    EditRoleComponent,
    CellListComponent,
    AddCellsComponent,
    EditCellsComponent,
    SheetComponent,
    StepperImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [MachineCreateComponent],
})
export class AppModule {}
