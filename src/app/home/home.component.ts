import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //cells = ['cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5', 'cell 6'];
  cellName;
  lists = [];
  checklistVal = [];
  checkLists = [];
  cells = [];
  cellSub;
  cellData = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCells();
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cellData = users;
        // this.dataSource = new MatTableDataSource<any>(users);
        console.log('Dashboard ngOnInit: ', this.cellData);
        this.cells = this.cellData.map((cells, index) => {
          return cells.cellName;
        });
        this.cells = [...new Set(this.cells)];

        this.checkLists = this.cellData.map((list) => {
          return { cell: list.cellName, checklist: list.checklistName };
        });
        console.log('checkLists: ', this.checkLists);

        console.log('Add Role CellNaem ngOnInit: ', this.cells);
      });
  }
  onTabChange(event: MatTabChangeEvent) {
    var id = event.index + 1;
    var str = event.tab.textLabel;
    this.cellName = str;
    this.lists = [];
    console.log(this.cellData);
    console.log(event.tab.textLabel);
    //this.checklistVal = this.cellData[id].checklistName;
    for (var i = 0; i < this.cellData.length; i++) {
      if (str == this.cellData[i].cellName) {
        this.lists.push(this.cellData[i].checklistName);
      }
    }
    console.log(this.lists);
  }

  onClick(i, cell) {
    console.log(this.cellName, cell);
  }
}
