import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
})
export class RelatorioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('Relatorio');
  }
}
