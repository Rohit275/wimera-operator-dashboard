import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  @Input() cellId: string;
  constructor() {}

  ngOnInit(): void {}

  onClickJH() {
    console.log('JH cellId: ', this.cellId);
  }
}
