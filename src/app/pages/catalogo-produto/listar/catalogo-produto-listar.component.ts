import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { CatalogoProduto } from '../_models/catalogo-produto.model';
import { CatalogoProdutoService } from '../_services/catalogo-produto.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';

@Component({
  selector: 'app-catalogo-produto-listar',
  templateUrl: './catalogo-produto-listar.component.html',
  styleUrls: ['./catalogo-produto-listar.component.scss'],
})
export class CatalogoProdutoListarComponent implements OnInit, OnDestroy {
  constructor(
    private catalogoProdutoService: CatalogoProdutoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private tipoProdutoService: TipoProdutoService,
    private baseService: BaseService
  ) {
    this.pesquisarSubscription = this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.catalogoProdutoService.searchItems(this.pagina, this.tamanho_pagina, query))
      )
      .subscribe((results) => {
        this.catalogoProdutos = results;
        this.quantidade_total = this.catalogoProdutos[0].quantidade_total!;
      });
  }

  searchResults$: Observable<CatalogoProduto[]>;
  searchTerms = new Subject<string>();

  pagina: number = 1;
  tamanho_pagina: number = 10;
  quantidade_total: number = 1;
  searchItem: string = '';
  catalogoProdutos: CatalogoProduto[];
  unidadesMedida: UnidadeMedida[];
  tiposProduto: TipoProduto[];
  pesquisarSubscription: Subscription;
  filtroButton: boolean = false;
  filtroAccordion: boolean = false;
  unidadesMedidaSelecionada: string = '';
  tipoProdutoSelecionado: string = '';
  idSelecionado: string = '';
  @ViewChild('importFile') importFile: ElementRef;

  ngOnInit(): void {
    this.pagina = 1;
    this.tamanho_pagina = 10;

    this.catalogoProdutoService
      .listarTodosPaginado(this.pagina, this.tamanho_pagina, this.searchItem)
      .subscribe((resp) => {
        console.log(resp);
        this.catalogoProdutos = resp;
        this.quantidade_total = resp[0].quantidade_total!;
      });
  }

  mudarPagina() {
    this.catalogoProdutoService
      .listarTodosPaginado(this.pagina, this.tamanho_pagina, this.searchItem)
      .subscribe((resp) => {
        this.catalogoProdutos = resp;
        this.quantidade_total = resp[0].quantidade_total!;
      });
  }

  pesquisarItem() {
    this.searchTerms.next(this.searchItem);
  }

  ngOnDestroy(): void {
    this.pesquisarSubscription.unsubscribe();
  }

  public trackItem(index: number, item: CatalogoProduto) {
    return item.id;
  }

  deletar(id: number = 0): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de recuperar esta informação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#23b349',
      cancelButtonColor: '#eb2067',
    }).then((result) => {
      if (result.value) {
        this.catalogoProdutoService.deletar(id).subscribe({
          next: () => {
            this.catalogoProdutos = this.catalogoProdutos.filter((produtoServico) => produtoServico.id != id);
            Swal.fire('Excluído!', 'Produto excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este produto!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  openAccordion() {
    this.filtroButton = !this.filtroButton;

    if (this.filtroAccordion) {
      return;
    }
    this.filtroAccordion = true;
    this.unidadeMedidaService.listarTodos().subscribe({
      next: (unidadesMedida) => {
        this.unidadesMedida = unidadesMedida;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.tipoProdutoService.listarTodos().subscribe({
      next: (tipoProduto) => {
        this.tiposProduto = tipoProduto;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filtrar() {
    Swal.showLoading();
    const parameters = {
      unidade_medida: this.unidadesMedidaSelecionada,
      tipo_produto: this.tipoProdutoSelecionado,
      id: this.idSelecionado,
    };

    this.catalogoProdutoService.filtrar(parameters).subscribe({
      next: (catalogoProdutos) => {
        this.catalogoProdutos = catalogoProdutos;
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar os produtos!', 'error');
      },
    });
  }

  limparFiltros() {
    this.unidadesMedidaSelecionada = '';
    this.tipoProdutoSelecionado = '';
    this.idSelecionado = '';
  }
}
