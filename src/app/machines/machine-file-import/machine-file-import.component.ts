import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MachineService } from '../machine.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as _ from 'underscore';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-machine-file-import',
  templateUrl: './machine-file-import.component.html',
  styleUrls: ['./machine-file-import.component.css'],
})
export class MachineFileImportComponent implements OnInit {
  private header: boolean = true;
  public isLoading: boolean = false;
  public isValidFile: boolean = false;
  public isHeader: boolean = false;
  public isChecked: boolean = false;
  public isKeyValue: boolean = false;
  public KeyValueRow: boolean = false;
  public keyValue: boolean = false;
  public isValueAdded: boolean = false;
  public isForm: boolean = true;
  public isImport: boolean = false;
  selectedRadio: string;
  cells = [];
  bays = [];
  OpNO;
  checkLists = [];
  cellData: any;
  cellSub: Subscription;
  csvRecords: any = [];
  columnKey: any[] = [];
  keyValuePairs: any[] = [];
  columnValues = [];
  durationInSeconds = 3;
  currentBay;
  public row;
  public choiceVal;
  public keyvalrow;
  public FileName;
  isCancel: boolean = false;
  public rows: any[] = [
    { id: 1, name: 'Row 1', value: '0' },
    { id: 2, name: 'Row 2', value: '1' },
    { id: 3, name: 'Row 3', value: '2' },
    { id: 4, name: 'Row 4', value: '3' },
    { id: 5, name: 'Row 5', value: '4' },
  ];

  public choice: any[] = [
    { id: 1, value: 'Yes' },
    { id: 2, value: 'No' },
  ];

  constructor(
    private ngxCsvParser: NgxCsvParser,
    public machineService: MachineService,
    public dialogRef: MatDialogRef<MachineFileImportComponent>,
    private _snackbar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getCells();
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cellData = users;
        console.log('Dashboard ngOnInit: ', this.cellData);

        this.bays = this.cellData.map((cells, index) => {
          return cells.Bay;
        });
        this.bays = [...new Set(this.bays)];
      });
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.FileName = $event.srcElement.files[0].name;
    this.header =
      (this.header as unknown as string) === 'true' || this.header === false;
    this.readData(files);
  }

  readData(files) {
    this.isValidFile = true;
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.csvRecords.push(...result);

          this.isKeyValue = true;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  getChoice() {
    this.choiceVal = this.selectedRadio;
    if (this.choiceVal == 'Yes') {
      this.isKeyValue = false;
      this.KeyValueRow = true;
      this.isValidFile = false;
      this.selectedRadio = null;
    } else if (this.choiceVal == 'No') {
      this.KeyValueRow = false;
      this.isKeyValue = false;
      this.isValidFile = true;
      this.selectedRadio = null;
    }
  }

  onSelectBay(event: MatSelectChange) {
    var bay = event.value;
    this.cells = [];
    console.log('Before checklist bay: ', this.checkLists);
    this.checkLists = [];
    console.log('After checklist bay: ', this.checkLists);
    this.currentBay = bay;
    for (var i = 0; i < this.cellData.length; i++) {
      if (bay == this.cellData[i].Bay) {
        this.cells.push(this.cellData[i].cellName);
      }
    }
    this.cells = [...new Set(this.cells)];
    console.log(this.cells);
  }

  onSelectCell(event: MatSelectChange) {
    //console.log(this.cells);
    var cell = event.value;
    // this.cells = [];
    this.checkLists = [];
    for (var i = 0; i < this.cellData.length; i++) {
      if (
        cell == this.cellData[i].cellName &&
        this.currentBay == this.cellData[i].Bay
      ) {
        this.checkLists.push(this.cellData[i].checklistName);
      }
    }
    this.checkLists = [...new Set(this.checkLists)];
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // var arr = [];
      // arr = form.value;
      // console.log('arr', arr);
      // arr=JSON.parse(arr);
      // arr.forEach((x) => !x.opNo);
      // console.log('After Map', arr);
      this.OpNO = form.value.opNo;
      this.adminService.getParticularCell(form.value);
      this.isCancel = true;
      this.isForm = false;
      this.isImport = true;
    }
  }

  getKeyValuesRow() {
    this.keyvalrow = this.selectedRadio;
    this.selectedRadio = null;
    this.KeyValueRow = false;
    this.isKeyValue = false;
    this.keyValue = true;
  }
  getRadio() {
    this.row = this.selectedRadio;
    this.isValidFile = false;
    this.isHeader = true;
    console.log('Radio value: ', this.selectedRadio);
  }

  getSelectedKeyValues(value, event: MatCheckboxChange) {
    if (event.checked) {
      this.isValueAdded = true;
      this.keyValuePairs.push(value);
    } else {
      if (this.keyValuePairs.length - 1 == 0) {
        this.isValueAdded = false;
      }
      let index = this.keyValuePairs.indexOf(value);
      this.keyValuePairs.splice(index, 1);
    }
    console.log(this.keyValuePairs);
  }
  getSelectedColumn(value, event: MatCheckboxChange, index) {
    if (event.checked) {
      this.isChecked = true;
      this.columnKey.push({ index: index, Column: value });
    } else {
      console.log('Column Key length:', this.columnKey.length);
      if (this.columnKey.length - 1 == 0) {
        this.isChecked = false;
      }
      let index = this.columnKey.indexOf(value);
      this.columnKey.splice(index, 1);
    }
    console.log(this.columnKey);
  }

  getColumnValues() {
    var i,
      j = 0,
      arr = [];
    for (i = this.row; i < this.csvRecords.length; i++) {
      arr[i] = [];
      for (j = 0; j < this.columnKey.length; j++) {
        var val = this.columnKey[j].index;
        arr[i][j] = this.csvRecords[i][val];
      }
    }
    return arr;
  }

  convertKeyValue(final) {
    var output: any[] = [];
    let i = parseInt(this.row);
    for (let index = i + 1; index < final.length; index++) {
      output.push(_.object(final[i], final[index]));
    }
    return output;
  }

  onNextFile() {
    this.keyValue = false;
    this.isValidFile = true;
    console.log('File Name :', this.FileName);
    this.machineService.passKeyValue(this.FileName, this.keyValuePairs);
  }

  onBack() {
    this.KeyValueRow = false;
    this.isKeyValue = true;
    if (this.isValidFile) {
      this.isValidFile = false;
      this.isKeyValue = true;
    }
    if (this.keyValue) {
      this.keyValue = false;
      this.isKeyValue = true;
    }
    if (this.isHeader) {
      this.isHeader = false;
      this.isKeyValue = true;
    }
  }
  onAddFile() {
    if (this.csvRecords.length > 0) {
      var filteredData = [],
        final = [];
      final = this.getColumnValues();

      filteredData = this.convertKeyValue(final);
      //console.log(filteredData);
      this.adminService.putImportValues(this.OpNO, filteredData);
      //this.machineService.importCsv(this.FileName, filteredData);
      setTimeout(() => {
        this.isLoading = true;
        this.machineService.getMachines();
        this.machineService.getCollections();
        this.dialogRef.close();
      }, 1000);
      this._snackbar.open('New file imported!', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
      });
      this.isLoading = false;
    }
    // console.log('CSV: ', this.csvRecords);
  }
}
