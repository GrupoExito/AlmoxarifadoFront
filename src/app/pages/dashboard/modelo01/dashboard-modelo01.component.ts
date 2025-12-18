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
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { DadosColumns } from 'src/app/modules/graficos/_model/dados.model';
import { DashboardQuadrimestreQuantitativos, DashboardQuantitativos } from '../_model/DashboardQuantitativos.model';
import { DashboardService } from '../_services/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard-mod-01',
  templateUrl: './dashboard-modelo01.component.html',
  styleUrls: ['./dashboard-modelo01.component.scss'],
})
export class DashboardModelo01Component implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  processosEmTramitacao: DashboardQuantitativos[];
  contratosVigentes: DashboardQuantitativos[];
  atasVigentes: DashboardQuantitativos[];
  comprasEmAndamento: DashboardQuantitativos[];

  comprasQuadrimestre: DashboardQuadrimestreQuantitativos[];

  meses: string[] = [];
  dadosColumns: DadosColumns[] = [];

  //setores: SetorFluxo[];
  solicitacaoDespesas: SolicitacaoDespesa[];
  chartOptionsSetor: Partial<ChartOptions>;
  chartOptionsStatus: Partial<ChartOptions>;
  graficosPronto: boolean = false;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {

    this.service.listarProcessosTramitacao(0).subscribe((x) => {
      this.processosEmTramitacao = x;
    });

    this.service.listarContratosVigentes(0).subscribe((x) => {
      this.contratosVigentes = x;
    });

    this.service.listarAtasVigentes(0).subscribe((x) => {
      this.atasVigentes = x;
    });

    this.service.listarComprasEmAndamento(0).subscribe((x) => {
      this.comprasEmAndamento = x;
    });

    this.service.listarComprasQuadrimestre(0).subscribe((x) => {
      this.comprasQuadrimestre = x;
      const groupedData: { [sigla: string]: number[] } = {};
      const groupedMonth: { [mes: string]: number[] } = {};

      //estruturar os dados no formato aceito pelo componente de gráfico
      for (const item of x) {
        if (!groupedData[item.sigla]) {
          groupedData[item.sigla] = [];
        }
        groupedData[item.sigla].push(item.qtd);
      }

      for (const sigla in groupedData) {
        if (groupedData.hasOwnProperty(sigla)) {
          this.dadosColumns.push({ data: groupedData[sigla], name: sigla });
        }
      }

      const mesesSet = new Set<string>();

      for (const item of x) {
        mesesSet.add(item.mes);
      }

      // Converter o Set para um array
      const mesesUnicos = Array.from(mesesSet);

      mesesUnicos.sort((a, b) => {
        const [mesA, anoA] = a.split('/').map(Number);
        const [mesB, anoB] = b.split('/').map(Number);

        // Primeiro, compare os anos
        if (anoA !== anoB) {
          return anoA - anoB;
        }

        // Se os anos forem iguais, compare os meses
        return mesA - mesB;
      });

      this.meses = mesesUnicos;
    });
  }

  openFullscreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
}
