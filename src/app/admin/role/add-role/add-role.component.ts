import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  cells = ['cell 1', 'cell 2', 'cell 3', 'cell 4'];
  selectedCells = [];
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private _snackbar: MatSnackBar,
    private adminService: AdminService
  ) {}

  public isLoading: boolean = false;
  durationInSeconds = 3;

  ngOnInit(): void {}

  onCheckEvent(value, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedCells.push(value);
    } else {
      let index = this.selectedCells.indexOf(value);
      this.selectedCells.splice(index, 1);
    }
    console.log(this.selectedCells);
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }

  oncreateRole(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.adminService.addUser(form.value, this.selectedCells);
    setTimeout(() => {
      this.adminService.getUsers();
    });
    this._snackbar.open('New value added!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
    });
    this.onCancel(form);
  }
}
