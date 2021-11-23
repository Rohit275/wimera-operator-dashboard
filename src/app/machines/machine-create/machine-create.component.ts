import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MachineService } from '../machine.service';

@Component({
  selector: 'app-machine-create',
  templateUrl: './machine-create.component.html',
  styleUrls: ['./machine-create.component.css'],
})
export class MachineCreateComponent implements OnInit {
  SignalType = [
    { id: 'Analog', value: 'Analog' },
    { id: 'Standard', value: 'Standard' },
  ];
  dynamicColumns: any[] = [];
  public isLoading: boolean = false;
  durationInSeconds = 3;
  constructor(
    public machineService: MachineService,
    public dialogRef: MatDialogRef<MachineCreateComponent>,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDynamicColumns();
  }

  onSaveMachine(form: NgForm) {
    // console.log('Machine create form values: ', form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(form.value);
    this.machineService.addData(form.value);
    setTimeout(() => {
      this.machineService.getMachines();
    }, 1000);
    this._snackbar.open('New value added!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
    });
    this.onCancel(form);
  }

  getDynamicColumns() {
    this.dynamicColumns = this.machineService.getDynamicColumns();
  }
  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }
}
