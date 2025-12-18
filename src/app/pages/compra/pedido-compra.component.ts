import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido-compra',
  templateUrl: './pedido-compra.component.html',
  styleUrls: ['./pedido-compra.component.scss'],
})
export class PedidoCompraComponent implements OnInit {
  constructor() {}

  id: number;
  ngOnInit(): void {
    console.log('Pedido Compra');
  }
}
