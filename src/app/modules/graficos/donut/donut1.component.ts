import { Component, Input, OnInit } from '@angular/core';
import { Dados } from '../_model/dados.model';

@Component({
  selector: 'app-donut1',
  templateUrl: './donut1.component.html',
})
export class Donut1Component implements OnInit {
  chartOptions: any = {};

  @Input() componentName: string = 'kt_donut1_chart';
  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;
  @Input() unidadeMedida?: string = 'R$';
  @Input() valorTitulo: number = 150;
  @Input() mostrarPorcentagem?: boolean = false;
  @Input() labelDonut?: string = "";
  @Input() dados: Dados[] = [
    { ordem: 0, valor: 50, descricao: 'estático' },
    { ordem: 1, valor: 50, descricao: 'estático' },
    { ordem: 3, valor: 50, descricao: 'estático' },
  ];

  constructor() {}

  ngOnInit(): void {

    setTimeout(() => {
      this.valorTitulo = 0;

      if (this.dados) {
        this.dados.forEach((v) => {
          this.valorTitulo += v.valor;
      });
    }
      initChart(this.chartSize, this.chartLine, this.chartRotate, this.componentName, this.dados);
    }, 10);
  }
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145,
  componentName: string,
  data: Dados[]
) {
  const el = document.getElementById(componentName);
  if (!el) {
    return;
  }

  var options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement('canvas');
  const span = document.createElement('span');

  // @ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    // @ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  // @ts-ignore
  ctx.translate(options.size / 2, options.size / 2); // change center
  // @ts-ignore
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (color: string, lineWidth: number, percent: number) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'square'; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init
  const colors = [
    '#E4E6EF',
    '#1035de',
    '#de1024',
    '#363636',
    '#6959CD',
    '#7FFFD4',
    '#00FF7F',
    '#BDB76B',
    '#8A2BE2',
    '#FF69B4',
    '#B22222',
    '#FFA500',
    '#FFFF00',
    '#FFF5EE',
    '#C0C0C0',
    '#B0C4DE',
    '#20B2AA',
    '#9ACD32',
    '#DEB887',
    '#DA70D6',
    '#F08080',
    '#FF7F50',
    '#FF4500',
  ];


  const newarray = data;//.sort((a, b) => a.valor - b.valor);
  //const menorValue = newarray[0].valor;
  //const maiorValue = newarray[newarray.length-1].valor;

  const initialValue = 0;
  const soma = data.reduce((accumulator, currentValue) => accumulator + currentValue.valor, initialValue);

  let acumulador = 1;

  newarray.forEach((v,i) => {
    //const fator = (menorValue / soma) / (v.valor / soma);

    drawCircle(colors[i], options.lineWidth, acumulador);
    acumulador -=(v.valor / soma);
  });

};
