import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { dtOptions } from '@pages/shared/globals';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';

import { PedidoCompraSaldo } from '../_models/pedido-compra.model';
import { PedidoCompraService } from '../_services/pedido-compra-service';

@Component({
  selector: 'app-pedido-compra-listar',
  templateUrl: './pedido-compra-listar.component.html',
  styleUrls: ['./pedido-compra-listar.component.scss'],
})
export class PedidoCompraListarComponent implements OnInit, OnDestroy {
  constructor(
  private pedidoCompraService: PedidoCompraService,
  private fornecedorService: FornecedorService
) {}


  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  pedidos: PedidoCompraSaldo[] = [];

  filtroButton = false;

  // filtros (string pq vem do input/select)
  pedidoCompraSelecionado: string = '';
  fornecedorSelecionado: number | null = null;
  parcialSelecionado: string = '0'; // 0 ou 1

  fornecedores: Fornecedor[] = [];
  filtroAccordion = false;


  ngOnInit(): void {
    this.dtOptions = {
      ...dtOptions,
      pageLength: 50,
      lengthMenu: [10, 25, 50, 100],
      order: [[0, 'desc']],
    };

    // inicial: sem filtro => 0/0/0
    this.carregar(0, 0, 0, true);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  trackItem(index: number, item: PedidoCompraSaldo) {
    return item.id;
  }


filtrar() {
  const pedido = this.toNumberOrZero(this.pedidoCompraSelecionado);
  const fornecedor = this.fornecedorSelecionado ? Number(this.fornecedorSelecionado) : 0;

  const parcial = this.parcialSelecionado === '1' ? 1 : 0;

  this.carregar(pedido, fornecedor, parcial, false);
}

limparFiltros() {
  this.pedidoCompraSelecionado = '';
  this.fornecedorSelecionado = null;
  this.parcialSelecionado = '0';
}


  private carregar(pedido: number, fornecedor: number, parcial: number, primeiraCarga: boolean) {
    Swal.showLoading();

    this.pedidoCompraService.listarPorFiltro(pedido, fornecedor, parcial).subscribe({
      next: (data) => {
        this.pedidos = data;

        if (primeiraCarga) {
          this.dtTrigger.next(null);
        } else {
          this.rerender();
        }

        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possível listar os pedidos.', 'error');
      },
    });
  }

  private toNumberOrZero(value: any): number {
    if (value === null || value === undefined) return 0;
    const s = String(value).trim();
    if (!s) return 0;
    const n = Number(s);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  openAccordion() {
    this.filtroButton = !this.filtroButton;

    if (this.filtroAccordion) return;
    this.filtroAccordion = true;

    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => (this.fornecedores = fornecedores),
      error: (e) => console.log(e),
    });
  }

}