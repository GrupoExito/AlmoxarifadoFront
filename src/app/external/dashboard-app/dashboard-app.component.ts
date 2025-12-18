import { Component, OnInit } from '@angular/core';
import { ContratoAcompanhamentoQuantidade } from '@pages/contrato/_models/contrato.model';
import { ContratoService } from '@pages/contrato/_services/contrato.service';

@Component({
  selector: 'app-dashboard-app',
  templateUrl: './dashboard-app.component.html',
  styleUrls: ['./dashboard-app.component.scss'],
})
export class DashboardAppComponent implements OnInit {

  dados?: ContratoAcompanhamentoQuantidade;

  constructor(private contratoService: ContratoService) {}

  kpis = [
    { label: 'Contratos Vigentes', key: 'quantidade_vigencia' },
    { label: 'Contratos Aditivados', key: 'quantidade_aditivado' },
    { label: 'Vencendo em 30 dias', key: 'quantidade_30dias' },
    { label: 'Vencendo em 60 dias', key: 'quantidade_60dias' },
    { label: 'Vencendo em 90 dias', key: 'quantidade_90dias' },
    { label: 'Consumo 50%', key: 'quantidade_50porcento' },
    { label: 'Consumo 75%', key: 'quantidade_75porcento' },
    { label: 'Consumo 90%', key: 'quantidade_90porcento' },
    { label: 'Contratos Vencidos', key: 'quantidade_vencido' }
  ];

  ngOnInit(): void {
    this.contratoService.listarAcompanhamentoContratoDashboardApp().subscribe({
      next: (res) => this.dados = res,
      error: (err) => console.error('Erro ao carregar dados', err)
    });
  }

  getValor(key: string): number {
    return this.dados && (this.dados as any)[key] !== undefined ? (this.dados as any)[key] : 0;
  }
}