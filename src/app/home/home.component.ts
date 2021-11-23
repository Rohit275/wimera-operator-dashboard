import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cells = ['cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5', 'cell 6'];
  constructor() {}

  ngOnInit(): void {}
}
