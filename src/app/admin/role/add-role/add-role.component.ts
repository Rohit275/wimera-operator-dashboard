import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MachineService } from '../../../machines/machine.service';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private _snackbar: MatSnackBar,
    private machineservice: MachineService
  ) {}
  public isLoading: boolean = false;
  durationInSeconds = 3;
  ngOnInit(): void {}
  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }
  oncreateRole(form: NgForm) {
    // console.log('Machine create form values: ', form.value);
    var Role, UName, Password;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    Role = form.value.RoleName;
    UName = form.value.userName;
    Password = form.value.Password;
    this.machineservice.addRole(form.value);
    //this.machineservice.getRoles();
    this._snackbar.open('New value added!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
    });
    this.onCancel(form);
  }
}
