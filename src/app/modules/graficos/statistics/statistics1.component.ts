import { Component, Input, OnInit } from '@angular/core';
import { DadosColumns } from '../_model/dados.model';

@Component({
  selector: 'app-statistics1',
  templateUrl: './statistics1.component.html',
})
export class Statistics1Component implements OnInit {
  @Input() chartColor: string = '';
  @Input() chartHeight: string;
  @Input() unidadeMedida: string = 'R$';
  @Input() title: string = 'Compras por secretaria último Bimestre';
  @Input() value: number = 0;
  @Input() totalMeses: number = 4;
  @Input() subTitle: string = '';
  @Input() data: DadosColumns[] = [
    {
      name: 'Educação',
      data: [60, 50],
    },
    {
      name: 'Saúde',
      data: [50, 70],
    },
    {
      name: 'Social',
      data: [50, 70],
    },
  ];

  @Input() categories: string[] = [
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

  chartOptions: any = {};

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = getChartOptions(this.chartHeight, this.data, this.categories, this.unidadeMedida);
  }
}

function getChartOptions(chartHeight: string, data: DadosColumns[], dataCategories: string[], unidadeMedida: string) {
  const labelColor = '#0f0f0f';
  const borderColor = '#1035de';

  return {
    series: data,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
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
      y: {
        formatter: function (val: number) {
          return unidadeMedida + val;
        },
      },
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
