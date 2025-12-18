import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termo-referencia',
  templateUrl: './termo-referencia.component.html',
  styleUrls: ['./termo-referencia.component.scss'],
})
export class TermoReferenciaComponent implements OnInit {
  constructor() {}

  id: number;
  ngOnInit(): void {
    console.log('TR');
  }
}
