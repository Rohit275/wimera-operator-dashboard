import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { EditRoleComponent } from './admin/role/edit-role/edit-role.component';
import { CellListComponent } from './admin/cells/cell-list/cell-list.component';
import { AddCellsComponent } from './admin/cells/add-cells/add-cells.component';
import { EditCellsComponent } from './admin/cells/edit-cells/edit-cells.component';
import { SheetComponent } from './sheet/sheet/sheet.component';
import { StepperImportComponent } from './sheet/stepper-import/stepper-import.component';
import { OpDashboardComponent } from './Operator/op-dashboard/op-dashboard.component';
import { NavbarComponent } from './Operator/navbar/navbar.component';
import { OperatorLayoutComponent } from './layout/operator-layout.component';
import { OpSheetComponent } from './Operator/op-sheet/op-sheet.component';
import { SvHeaderComponent } from './supervisor/sv-header/sv-header.component';
import { SvViewtableComponent } from './supervisor/sv-viewtable/sv-viewtable.component';
import { SupervisorLayoutComponent } from './layout/supervisor-layout.component';
import { SvReviewtableComponent } from './supervisor/sv-reviewtable/sv-reviewtable.component';
import { SvReportComponent } from './supervisor/sv-report/sv-report.component';

import { ResizeColumnDirective } from './Operator/op-sheet/resize-column.directive';
import { ChecklistsComponent } from './Operator/checklists/checklists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    OpDashboardComponent,
    AddRoleComponent,
    RoleListComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    EditRoleComponent,
    CellListComponent,
    AddCellsComponent,
    EditCellsComponent,
    SheetComponent,
    StepperImportComponent,
    NavbarComponent,
    OperatorLayoutComponent,
    OpSheetComponent,
    ResizeColumnDirective,
    SvHeaderComponent,
    SvViewtableComponent,
    SupervisorLayoutComponent,
    SvReviewtableComponent,
    SvReportComponent,
    ChecklistsComponent,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [AuthService, AuthGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
