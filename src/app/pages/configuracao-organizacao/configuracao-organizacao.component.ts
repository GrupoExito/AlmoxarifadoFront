import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao-organizacao',
  templateUrl: './configuracao-organizacao.component.html',
  styleUrls: ['./configuracao-organizacao.component.scss'],
})
export class ConfiguracaoOrganizacaoComponent implements OnInit {
  constructor() {}

  id: number;
  ngOnInit(): void {
    console.log('Configuração Organização');
  }
}
