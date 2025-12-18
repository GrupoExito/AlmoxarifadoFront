import { Component, OnInit, ViewChild } from '@angular/core';
import { SetorFluxo, Status, StatusDisponiveisDFD } from '@pages/shared/models/fluxo.model';
import { FluxoService } from '@pages/shared/services/fluxo.service';
import { SolicitacaoDespesa } from '@pages/solicitacao-despesa/_models/solicitacao-despesa.model';
import { SolicitacaoDespesaService } from '@pages/solicitacao-despesa/_services/solicitacao-despesa.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {
  CategoriaItem,
  DadosColumns,
  DashboardPedidoCompraSecretaria,
  DashboardUltimosPedidos,
  DashboardUltimosProcessosContratacoes,
  DashboardUltimosProcessosContratos,
  ItemContrato,
  MesContrato,
} from '../_model/DashboardQuantitativos.model';
import { ContratoService } from '@pages/contrato/_services/contrato.service';
import { ContratacaoService } from '@pages/contratacao/_services/contratacao.service';
import { DashboardService } from '../_services/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SatisfacaoModalComponent } from '../satisfacao/satisfacao.component';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { Dashboard } from '@pages/almoxarifado/_models/Dashboard.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis[];
  stroke: ApexStroke;
};

type Tabs = 'kt_table_widget_5_tab_1' | 'kt_table_widget_5_tab_2' | 'kt_table_widget_5_tab_3';
type Year = '2024' | '2025';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  setores: SetorFluxo[];
  solicitacaoDespesas: SolicitacaoDespesa[];
  chartOptionsSetor: Partial<ChartOptions>;
  chartOptionsStatus: Partial<ChartOptions>;
  chartOptionsPedidosPorSecretaria: Partial<ChartOptions>;
  graficosPronto: boolean = false;
  graficosProntoContrato: boolean = false;
  graficosProntoSecretaria: boolean = false;
  activeTab: Tabs = 'kt_table_widget_5_tab_1';
  activeTabCompra: Year = '2025';
  ano: number = 2025;
  totalContratos: number = 0;
  valorTotalContratos: number = 0;
  valor_pago: number = 0;
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

  chartOptionsStacked: any = {};
  classificacaoMap: any = {
    8: 'Serviços',
    12: 'Transportes',
    13: 'Materiais',
    15: 'Aluguéis',
    16: 'Diárias',
    17: 'Pessoal',
  };

  contratacoes: DashboardUltimosProcessosContratacoes[];
  contratosDashboard: DashboardUltimosProcessosContratos[];
  pedidos: DashboardUltimosPedidos[];
  pedidosPorSecretaria: DashboardPedidoCompraSecretaria[];

  dataContratosVencimento: DadosColumns[] = [
    {
      name: 'Contratos',
      data: [],
    },
  ];

  dados: Dashboard;

  contratos: {
    contrato_id: number;
    modalidade_compra_id: number;
    data_validade: string;
    valor_total: number;
  }[];

  chartOptionsContratosVencimentos: any = {};
  chartHeight: string;
  constructor(
    private fluxoService: FluxoService,
    private almoxarifadoService: AlmoxarifadoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //this.listarRecursos();


    this.almoxarifadoService.GetDashboard().subscribe({
      next: (res) => {
        this.dados = res;
      },
      error: (error) => {
        console.log(error);
      },
    });

    

    this.listarPedidoComprasPorSecretaria();

    this.chartOptionsContratosVencimentos = getChartOptions(this.chartHeight, this.dataContratosVencimento, this.meses);

  }

  abrirModalPesquisaSatisfacao(): void {
    this.modalService.open(SatisfacaoModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });
  }

  listarPedidoComprasPorSecretaria() {
  /*  this.dashboardService.listarPedidoCompraPorSecretariaPorUsuario(this.activeTabCompra).subscribe({
      next: (pedidosPorSecretaria) => {
        this.pedidosPorSecretaria = pedidosPorSecretaria;
        // this.getChartOptionsPedidosPorSecretaria(pedidosPorSecretaria);
      },
      error: (error) => {
        console.log(error);
      },
    });*/
  }



  
  getChartOptionsSetor(setores: SetorFluxo[]) {
    const setoresNome = setores.map((setor) => setor.nome);
    const data = [];
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 1).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 2).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 3).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 4).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 5).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 6).length);
    data.push(this.solicitacaoDespesas.filter((sd) => sd.flsetor_id == 7).length);

    this.chartOptionsSetor = {
      series: [
        {
          name: 'Quantidade de SDs nesse setor',
          data: data,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: setoresNome,
      },
    };

    this.graficosPronto = true;
  }

  getChartOptionsStatus(solicitacaoDespesas: SolicitacaoDespesa[]) {
    const data = [];
    data.push(solicitacaoDespesas.filter((sd) => sd.flstatus_id == Status.Autorizado).length);
    data.push(solicitacaoDespesas.filter((sd) => sd.flstatus_id == Status.Embargado).length);
    data.push(solicitacaoDespesas.filter((sd) => sd.flstatus_id == Status['Em Análise']).length);
    data.push(solicitacaoDespesas.filter((sd) => sd.flstatus_id == Status.Cancelado).length);

    const categories = Object.values(StatusDisponiveisDFD).filter((status) => status != 'Aberto');

    this.chartOptionsStatus = {
      series: [
        {
          name: 'Quantidade de SDs nesse status',
          data: data,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
    };
  }

  getChartOptionsPedidosPorSecretaria(dataset: DashboardPedidoCompraSecretaria[]) {
    const labels = dataset.map((d) => d.secretaria_sigla);
    const quantidade = dataset.map((d) => d.quantidade_pedidos);
    const valores = dataset.map((d) => d.valor_pedidos);

    this.chartOptionsPedidosPorSecretaria = {
      series: [
        {
          name: 'Quantidade de Pedidos',
          type: 'column',
          data: quantidade,
        },
        {
          name: 'Valor Total (R$)',
          type: 'line',
          data: valores,
        },
      ],
      chart: {
        height: 500,
        type: 'line',
      },
      stroke: {
        width: [0, 4],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: (val: number, opts) => {
          // Se for a série do valor (linha, índice 1)
          return opts.seriesIndex === 1
            ? `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            : val.toString();
        },
        style: {
          fontSize: '12px',
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: [
        {
          title: {
            text: 'Quantidade de Pedidos',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Valor Total (R$)',
          },
          labels: {
            formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`,
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: [
          {
            formatter: (val: number) => `${val} pedidos`,
          },
          {
            formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          },
        ],
      },
    };
    this.graficosProntoSecretaria = true;
  }

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  setTabCompra(tab: Year) {
    this.activeTabCompra = tab;
    this.listarPedidoComprasPorSecretaria();
  }

  activeClassCompra(tab: Year) {
    return tab === this.activeTabCompra ? 'show active' : '';
  }

  getCategoriaDescricao(categoriaId: number): string {
    return CategoriaItem[categoriaId];
  }

  montarGrafico(dados: MesContrato[]): void {
    const classificacaoConfig: { [key: number]: { nome: string; cor: string } } = {
      1: { nome: 'Serviços', cor: '#008FFB' },
      2: { nome: 'Transportes', cor: '#00E396' },
      3: { nome: 'Materiais', cor: '#FEB019' },
      4: { nome: 'Aluguéis', cor: '#FF4560' },
      5: { nome: 'Diárias', cor: '#775DD0' },
      6: { nome: 'Pessoal', cor: '#3F51B5' },
      0: { nome: 'Outros', cor: '#78909C' },
    };

    console.log('Dados recebidos da API:', dados);

    // Define TODAS as classificações possíveis PRIMEIRO
    const todasClassificacoes = ['Serviços', 'Transportes', 'Materiais', 'Aluguéis', 'Diárias', 'Pessoal', 'Outros'];

    // Agrupa contratos por mês e classificação
    const contratosPorMesClassificacao: { [key: string]: { [classificacao: string]: number } } = {};

    // Pega o ano do contexto
    const ano = this.ano;

    // PRIMEIRO: Cria estrutura com todos os 12 meses e todas as classificações zeradas
    for (let mes = 1; mes <= 12; mes++) {
      const mesAno = `${ano}-${String(mes).padStart(2, '0')}`;
      contratosPorMesClassificacao[mesAno] = {};

      // Inicializa todas as classificações com zero para cada mês
      todasClassificacoes.forEach((classificacao) => {
        contratosPorMesClassificacao[mesAno][classificacao] = 0;
      });
    }

    // DEPOIS: Preenche com os dados reais
    dados.forEach((mes) => {
      mes.items.forEach((item: ItemContrato) => {
        const classificacao = classificacaoConfig[item.classificacao]?.nome || 'Outros';
        const dataValidade = new Date(item.data_validade);
        const mesAno = `${dataValidade.getFullYear()}-${String(dataValidade.getMonth() + 1).padStart(2, '0')}`;

        if (contratosPorMesClassificacao[mesAno]) {
          contratosPorMesClassificacao[mesAno][classificacao]++;
        }
      });
    });

    // Cria lista ordenada de meses
    const mesesOrdenados = Object.keys(contratosPorMesClassificacao).sort();

    // Cria as séries para o gráfico
    const series = todasClassificacoes.map((classificacao) => ({
      name: classificacao,
      data: mesesOrdenados.map((mes) => contratosPorMesClassificacao[mes][classificacao]),
    }));

    // Formata as categorias do eixo X (meses)
    const categorias = mesesOrdenados.map((mes) => {
      const [ano, mesNum] = mes.split('-');
      const nomeMes = this.meses[parseInt(mesNum) - 1];
      return `${nomeMes}/${ano}`;
    });

    // Define as cores NA ORDEM DAS CLASSIFICAÇÕES
    const cores = [
      '#008FFB', // Serviços
      '#00E396', // Transportes
      '#FEB019', // Materiais
      '#FF4560', // Aluguéis
      '#775DD0', // Diárias
      '#3F51B5', // Pessoal
      '#78909C', // Outros
    ];

    this.chartOptionsStacked = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        categories: categorias,
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Quantidade de Contratos',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        showForNullSeries: true,
        showForZeroSeries: true,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => {
            if (val === 0) return '';
            return `${val} contrato(s)`;
          },
        },
      },
      colors: cores,
    };

    this.graficosProntoContrato = true;
  }
}

function getChartOptions(chartHeight: string, data: DadosColumns[], dataCategories: string[]) {
  const labelColor = '#0f0f0f';
  const borderColor = '#1035de';

  return {
    series: data,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 150,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 0,
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: dataCategories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {},
    },
    colors: ['#1035de', '#de1024', '#363636', '#E4E6EF'],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}
