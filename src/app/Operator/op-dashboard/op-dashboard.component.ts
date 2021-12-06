import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
  RouterEvent,
} from '@angular/router';
import { parse } from 'querystring';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperatorService } from '../operator.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-op-dashboard',
  templateUrl: './op-dashboard.component.html',
  styleUrls: ['./op-dashboard.component.css'],
})
export class OpDashboardComponent implements OnInit {
  roles: any = [];
  cells: any = [];
  currentBay;
  currentCell;
  bays = [];
  ischecklist: boolean = false;
  checkLists = [];
  cellvals = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private opservice: OperatorService
  ) {}
  gridvals: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'symbol2',
    'symbol3',
    'symbol4',
    'symbol5',
  ];
  id;
  filter$: Observable<string>;

  ngOnInit(): void {
    this.opservice.getCells();
    this.opservice.getRoleUpdateListener().subscribe((roles) => {
      this.roles = roles;
      this.roles.forEach((x) => {
        console.log('Cells in foreach :', x);
        this.cells.push({
          Bay: x.Bay,
          cellName: x.cellName,
          checklistName: x.checklistName,
        });
      });
      this.cells.forEach((x) => {
        this.bays.push(x.Bay);
      });
      this.bays = [...new Set(this.bays)];
      console.log('Bay :', this.bays);
    });
  }

  onclickDiv(val) {
    alert(val);
  }
  onSelectBay(event) {
    this.cellvals = [];
    var bay = event.value;
    this.currentBay = bay;
    this.cells.forEach((x) => {
      if (bay == x.Bay) {
        this.cellvals.push(x.cellName);
      }
    });
    this.cellvals = [...new Set(this.cellvals)];
    console.log('CellName :', this.cellvals);
  }

  onSelectCell(event) {
    //this.checkLists = [];
    var cell = event.value;
    this.currentCell = cell;
  }

  onChoose() {
    this.checkLists = [];
    this.ischecklist = true;
    this.cells.forEach((x) => {
      if (this.currentBay == x.Bay && this.currentCell == x.cellName) {
        this.checkLists.push(x.checklistName);
      }
    });
    console.log('Checklists :', this.checkLists);
  }
}
