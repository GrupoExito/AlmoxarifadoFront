import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@pages/shared/services/base.service';
import { combineLatestWith, Subscription, iif, of } from 'rxjs';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { EMDataEtapasHeader } from '../_models/entrada-material-data.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';
import { switchMap, tap } from 'rxjs/operators';0

@Component({
  selector: 'app-entrada-material-visualizar',
  templateUrl: './entrada-material-visualizar.component.html',
})
export class EntradaMaterialVisualizarComponent implements OnInit, OnDestroy {
  constructor(
    private entradaMaterialService: EntradaMaterialService,
    private secretariaService: SecretariaFundoService,
    private almoxarifadoService: AlmoxarifadoService,
    private fornecedorService: FornecedorService,
    private pedidoService: PedidoCompraService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private route: Router
  ) {}

  emQuantidade: EMDataEtapasHeader | null = null;
  visualizarForm: FormGroup;
  id: number;
  subscription1: Subscription;
  subscription2: Subscription;
  ready: boolean = false;
  flstatus_id: number | null = null;

  ngOnInit(): void {
    console.log('Visualizar');

    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.entradaMaterialService.setRouteId(this.id);

    const entrada$ = this.entradaMaterialService.consultarPorId(this.id);

    const secretaria$ = this.secretariaService.listarTodos();
    const fornecedor$ = this.fornecedorService.listarTodos();
    const almoxarifado$ = this.almoxarifadoService.listarTodos();

    //pedido depende do fornecedor_id da entrada
    const pedido$ = entrada$.pipe(
      switchMap((entrada) =>
        iif(
          () => !!entrada?.fornecedor_id,
          this.pedidoService.listarTodosPorFornecedor(entrada.fornecedor_id),
          of([])
        )
      )
    );

    const entradaQuantidade$ = this.entradaMaterialService.consultarEntradaQuantidade(this.id);

    this.subscription1 = entrada$
      .pipe(combineLatestWith(secretaria$, fornecedor$, almoxarifado$, pedido$, entradaQuantidade$))
      .subscribe({
        next: ([entrada, secretaria, fornecedor, almoxarifado, pedido, entradaQuantidade]) => {
          entrada.data_entrada = this.baseService.formatDate(entrada.data_entrada!);
          entrada.data_nota = this.baseService.formatDate(entrada?.data_nota);

          this.entradaMaterialService.setEtapasHeader(entradaQuantidade);
          this.entradaMaterialService.emDataEtapasHeader.subscribe((quantidade) => {
            this.emQuantidade = quantidade;
          });

          this.entradaMaterialService.setEntrada({
            secretarias: secretaria,
            fornecedores: fornecedor,
            almoxarifados: almoxarifado,
            pedidoCompra: pedido,
            entradaMaterial: entrada,
          });

          this.ready = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.entradaMaterialService.setEtapasHeader(null);
    this.entradaMaterialService.setEntrada(null);
    this.entradaMaterialService.setRouteId(null);
    this.subscription1.unsubscribe();
  }
}
