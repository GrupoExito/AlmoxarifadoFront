import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

import { PedidoCompraService } from '../_services/pedido-compra-service';
import { PedidoCompraResumo, PedidoCompraEntradaDetalhe, PedidoCompraSaldoItem, PedidoCompraEntrada } from '../_models/pedido-compra-view.model';

type StatusEntregaTipo = 'Sem entregas' | 'Entrega parcial' | 'Entrega total';

@Component({
  selector: 'app-pedido-compra-view',
  templateUrl: './pedido-compra-view.component.html',
})
export class PedidoCompraViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pedidoCompraService: PedidoCompraService
  ) {}

  id = 0;

  // PARTE 1
  resumo: PedidoCompraResumo | null = null;

  // PARTE 2
  itensSaldo: PedidoCompraSaldoItem[] = [];

  // PARTE 3 (vai plugar depois)
  entradas: PedidoCompraEntrada[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : 0;

    if (!this.id || Number.isNaN(this.id)) {
      Swal.fire('Atenção', 'ID do pedido inválido.', 'warning');
      return;
    }

    this.carregarTela();
  }

  carregarTela(): void {
  Swal.showLoading();

  forkJoin({
    itens: this.pedidoCompraService.listarSaldoItens(this.id),
    entradas: this.pedidoCompraService.listarEntradas(this.id),
  }).subscribe({
    next: ({ itens, entradas }) => {

      this.itensSaldo = itens ?? [];
      this.entradas = entradas ?? [];

      const quantidade_pedido = this.itensSaldo.reduce(
        (acc, x) => acc + (Number(x.quantidade_pedido) || 0),
        0
      );

      const quantidade_entrada = this.itensSaldo.reduce(
        (acc, x) => acc + (Number(x.quantidade_entrada) || 0),
        0
      );

      this.resumo = {
        id: this.id,
        quantidade_pedido,
        quantidade_entrada,
        fornecedor: '-', // depois você pluga resumo real
      };

      Swal.close();
    },
    error: () => {
      Swal.fire('Erro', 'Não foi possível carregar o detalhamento.', 'error');
    },
  });
}


  // ======= STATUS (PARTE 1) =======
  get statusEntrega(): StatusEntregaTipo {
    const qp = this.resumo?.quantidade_pedido ?? 0;
    const qe = this.resumo?.quantidade_entrada ?? 0;

    if (qe <= 0) return 'Sem entregas';
    if (qe > 0 && qe < qp) return 'Entrega parcial';
    return 'Entrega total';
  }

  get statusCssClass(): string {
    const s = this.statusEntrega;
    if (s === 'Sem entregas') return 'badge badge-light-danger';
    if (s === 'Entrega parcial') return 'badge badge-light-warning';
    return 'badge badge-light-success';
  }

  // Totais da Parte 2 (mantém o footer bonitinho)
  totalPedido(): number {
    return this.itensSaldo.reduce((acc, x) => acc + (Number(x.quantidade_pedido) || 0), 0);
  }

  totalEntrada(): number {
    return this.itensSaldo.reduce((acc, x) => acc + (Number(x.quantidade_entrada) || 0), 0);
  }
}