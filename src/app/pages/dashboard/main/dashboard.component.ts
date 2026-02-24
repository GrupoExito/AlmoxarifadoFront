import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';

// Ajuste o import conforme onde você colocou as interfaces
import { DashboardKpis, DashboardResponseDTO } from '@pages/almoxarifado/_models/dashboard.model';
import { DashboardPedidoCompraSecretaria } from '../_model/DashboardQuantitativos.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis[];
};

type Year = '2024' | '2025';

type DadosColumns = {
  name: string;
  data: number[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // Tabs
  activeTabCompra: Year = '2025';
  ano: number = 2025;

  // KPIs
  dados?: DashboardKpis;

  // Tabela
  pedidosPorSecretaria: DashboardPedidoCompraSecretaria[] = [];

  // Meses (para gráfico anual)
  meses: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  // Charts (inicializados para não estourar no template)
  chartOptionsSetor: Partial<ChartOptions> = {
    series: [{ name: 'Solicitações', data: [] }],
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: true } },
    dataLabels: { enabled: false },
    xaxis: { categories: [] },
    tooltip: {},
    yaxis: [],
  };

  chartOptionsStatus: Partial<ChartOptions> = {
    series: [{ name: 'Quantidade', data: [] }],
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: true } },
    dataLabels: { enabled: false },
    xaxis: { categories: [] },
    tooltip: {},
    yaxis: [],
  };

  dataContratosVencimento: DadosColumns[] = [{ name: 'Itens vencidos', data: new Array(12).fill(0) }];
  chartOptionsContratosVencimentos: any = {};
  chartHeight: string = '150';

  constructor(private almoxarifadoService: AlmoxarifadoService) {}

  ngOnInit(): void {
    this.ano = Number(this.activeTabCompra);

    // inicializa gráfico anual vazio
    this.chartOptionsContratosVencimentos = getChartOptions(
      this.chartHeight,
      this.dataContratosVencimento,
      this.meses.map((m) => `${m}/${this.ano}`)
    );

    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.almoxarifadoService.GetDashboard(this.ano).subscribe({
      next: (res: DashboardResponseDTO | any) => {
        // suporta camelCase ou PascalCase sem dor de cabeça
        const kpis = res.kpis ?? res.Kpis;
        this.dados = kpis;

        this.pedidosPorSecretaria = res.pedidosPorSecretaria ?? res.PedidosPorSecretaria ?? [];

        const topItens = res.itensMaisSolicitados ?? res.ItensMaisSolicitados ?? [];
        const vencer90 = res.itensVencendo90Dias ?? res.ItensVencendo90Dias ?? [];
        const vencidosAno = res.itensVencidosAno ?? res.ItensVencidosAno ?? [];

        this.montarGraficoTopItens(topItens);
        this.montarGraficoVencimento90(vencer90);
        this.montarGraficoVencidosAno(vencidosAno);
      },
      error: console.log,
    });
  }

  setTabCompra(tab: Year) {
    this.activeTabCompra = tab;
    this.ano = Number(tab);
    this.carregarDashboard();
  }

  activeClassCompra(tab: Year) {
    return tab === this.activeTabCompra ? 'show active' : '';
  }

  montarGraficoTopItens(dataset: { descricao: string; qtd: number }[]) {
    this.chartOptionsSetor = {
      ...this.chartOptionsSetor,
      series: [{ name: 'Solicitações', data: dataset.map((x) => x.qtd ?? 0) }],
      xaxis: { categories: dataset.map((x) => x.descricao) },
    };
  }

  montarGraficoVencimento90(dataset: { descricao: string; quantidade: number; data_validade: string }[]) {
    const ordenado = [...dataset].sort(
      (a, b) => new Date(a.data_validade).getTime() - new Date(b.data_validade).getTime()
    );

    const labels = ordenado.map((x) => {
      const d = new Date(x.data_validade);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      return `${x.descricao} (${dd}/${mm})`;
    });

    this.chartOptionsStatus = {
      ...this.chartOptionsStatus,
      series: [{ name: 'Quantidade', data: ordenado.map((x) => x.quantidade ?? 0) }],
      xaxis: { categories: labels },
    };
  }

  montarGraficoVencidosAno(dataset: { mes: number; qtd_vencidos: number }[]) {
    const valores = new Array(12).fill(0);

    dataset.forEach((x) => {
      const idx = (x.mes ?? 0) - 1;
      if (idx >= 0 && idx < 12) valores[idx] = x.qtd_vencidos ?? 0;
    });

    this.dataContratosVencimento = [{ name: 'Itens vencidos', data: valores }];

    this.chartOptionsContratosVencimentos = getChartOptions(
      this.chartHeight,
      this.dataContratosVencimento,
      this.meses.map((m) => `${m}/${this.ano}`)
    );
  }
}

function getChartOptions(chartHeight: string, data: any[], dataCategories: string[]) {
  const labelColor = '#0f0f0f';
  const borderColor = '#1035de';

  return {
    series: data,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 150,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '50%', borderRadius: 0 },
    },
    legend: { show: true },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 1, colors: ['transparent'] },
    xaxis: {
      categories: dataCategories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: labelColor, fontSize: '12px' } },
    },
    yaxis: { labels: { style: { colors: labelColor, fontSize: '12px' } } },
    fill: { type: 'solid' },
    states: {
      normal: { filter: { type: 'none', value: 0 } },
      hover: { filter: { type: 'none', value: 0 } },
      active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } },
    },
    tooltip: { style: { fontSize: '12px' }, y: {} },
    colors: ['#1035de', '#de1024', '#363636', '#E4E6EF'],
    grid: {
      padding: { top: 10 },
      borderColor,
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
  };
}