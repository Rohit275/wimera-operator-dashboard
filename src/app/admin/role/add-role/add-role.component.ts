import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  @ViewChildren('checklistCB') checkboxes: QueryList<ElementRef>;
  cellData = [];
  checkedArray: boolean[];
  checked: string;
  cellName;
  currentCell;
  iscellsChecked: boolean = false;
  checklist = [];
  cells = [];
  allotedVals = [];
  cellSub: Subscription;
  selectedCells = [];
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private _snackbar: MatSnackBar,
    private adminService: AdminService
  ) {}

  public isLoading: boolean = false;
  durationInSeconds = 3;

  ngOnInit(): void {
    this.adminService.getCells();
    this.checkedArray = [];
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cellData = users;
        // this.dataSource = new MatTableDataSource<any>(users);
        console.log('Add Role ngOnInit: ', this.cellData);
        this.cells = this.cellData.map((cells) => {
          return cells.cellName;
        });
        this.cells = [...new Set(this.cells)];
        console.log('Add Role CellNaem ngOnInit: ', this.cells);
      });
  }

  getChecklist(cellName) {
    this.cellData.forEach((x) => {
      if (x.cellName == cellName) {
        this.checklist.push({ Bay: x.Bay, checklist: x.checklistName });
      }
    });
    console.log(this.checklist);
  }

  onCheckEvent(value, event: MatCheckboxChange) {
    if (event.checked) {
      this.checkedArray = [];
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.iscellsChecked = true;
      this.cellName = value;
      this.currentCell = value;
      this.selectedCells.push(value);
      this.checklist.splice(0, this.checklist.length);
      this.getChecklist(value);
    } else {
      let index = this.selectedCells.indexOf(value);
      this.selectedCells.splice(index, 1);
      if (this.allotedVals.length > 0) {
        this.allotedVals = this.allotedVals.filter((x) => {
          if (x.cell != value) {
            return x;
          }
        });
      }
      if (this.selectedCells.length <= 0) {
        this.iscellsChecked = false;
      }
    }
    console.log('Alloted Vals :', this.allotedVals);
    // console.log(this.selectedCells);
  }

  onCheckChecklist(value, event: MatCheckboxChange) {
    if (event.checked) {
      this.allotedVals.push({
        cell: this.currentCell,
        checklists: value.checklist,
        Bay: value.Bay,
      });
    } else {
      let index = this.allotedVals.indexOf(value);
      this.allotedVals.splice(index, 1);
    }
    console.log('Alloted Vals :', this.allotedVals);
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
    this.adminService.addUser(form.value, this.allotedVals);
    setTimeout(() => {
      this.adminService.getUsers();
    }, 1000);
    this._snackbar.open('New value added!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
    });
    this.onCancel(form);
  }
}
