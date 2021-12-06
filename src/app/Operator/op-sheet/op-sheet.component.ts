import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-op-sheet',
  templateUrl: './op-sheet.component.html',
  styleUrls: ['./op-sheet.component.css'],
})
export class OpSheetComponent implements OnInit {
  sheetVals = [];
  cellVals = [];
  cardvals = [];
  bay;
  cell;
  checklist;
  tablevals = [];
  dynamicDisplayedColumns = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private opService: OperatorService) {}

  ngOnInit(): void {
    this.bay = this.opService.currentcardvals[0].Bay;
    this.cell = this.opService.currentcardvals[0].cellName;
    this.checklist = this.opService.currentcardvals[0].checklistName;
    // console.log(this.bay);

    this.opService.getSheets();
    this.opService.getSheetsUpdateListener().subscribe((sheets) => {
      this.sheetVals = sheets;
      console.log('Sheet values in op-sheet :', this.sheetVals);
      this.sheetVals.map((x) =>
        this.cellVals.push({ cell: x.cell, sheet: x.value })
      );
      console.log('Cell values :', this.cellVals);
      console.log(this.opService.currentcardvals[0]);
      console.log(this.bay, this.cell, this.checklist);
      this.cellVals.forEach((x) => {
        console.log(x.cell[0].Bay, x.cell[0].cellName, x.checklistName);
        if (
          this.bay == x.cell[0].Bay &&
          this.cell == x.cell[0].cellName &&
          this.checklist == x.cell[0].checklistName
        ) {
          this.tablevals = x.sheet;
          console.log('Filtered val :', this.tablevals);
        }
      });
      if (this.tablevals.length > 0) {
        this.dynamicDisplayedColumns = Object.keys(this.tablevals[0]);
      }
      this.dataSource = new MatTableDataSource<any>(this.tablevals);
      this.dataSource.paginator = this.paginator;
    });
  }
}
