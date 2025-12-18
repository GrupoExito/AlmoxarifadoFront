import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saida-material',
  templateUrl: './saida-material.component.html',
  styleUrls: ['./saida-material.component.scss'],
})

export class SaidaMaterialComponent implements OnInit {
  constructor() {}

  id: number;
  ngOnInit(): void {
    console.log('EM');
  }
}
