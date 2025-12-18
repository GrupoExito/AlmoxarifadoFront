import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada-material',
  templateUrl: './entrada-material.component.html',
  styleUrls: ['./entrada-material.component.scss'],
})
export class EntradaMaterialComponent implements OnInit {
  constructor() {}

  id: number;
  ngOnInit(): void {
    console.log('EM');
  }
}
