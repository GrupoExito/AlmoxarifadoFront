import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataRow } from '@pages/shared/models/dataRow.model';
import { BaseService } from '@pages/shared/services/base.service';
import { TipoProdutoService } from '@pages/tipo-produto/_services/tipoproduto.service';
import { UnidadeMedidaService } from '@pages/unidade-medida/_services/unidademedida.service';
import { debounceTime, distinctUntilChanged, firstValueFrom, Observable, Subject, Subscription, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ProdutoServico } from '../_models/produto-servico.model';
import { ProdutoServicoService } from '../_services/produto-servico.service';
import { TipoProduto } from '@pages/tipo-produto/_models/tipoproduto.model';
import { UnidadeMedida } from '@pages/unidade-medida/_models/unidademedida.model';

@Component({
  selector: 'app-produto-servico-listar',
  templateUrl: './produto-servico-listar.component.html',
  styleUrls: ['./produto-servico-listar.component.scss'],
})
export class ProdutoServicoListarComponent implements OnInit, OnDestroy {
  dtElement: any;
  constructor(
    private produtoServicoService: ProdutoServicoService,
    private unidadeMedidaService: UnidadeMedidaService,
    private tipoProdutoService: TipoProdutoService,
    private baseService: BaseService
  ) {
    this.pesquisarSubscription = this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.produtoServicoService.searchItems(this.pagina, this.tamanho_pagina, query))
      )
      .subscribe((results) => {
        this.produtoServicos = results;
        this.quantidade_total = this.produtoServicos[0].quantidade_total!;
      });
  }

  searchResults$: Observable<ProdutoServico[]>;
  searchTerms = new Subject<string>();

  pagina: number = 1;
  tamanho_pagina: number = 10;
  quantidade_total: number = 1;
  searchItem: string = '';
  produtoServicos: ProdutoServico[];
  unidadesMedida: UnidadeMedida[];
  tiposProduto: TipoProduto[];
  dtTrigger = new Subject<any>();
  pesquisarSubscription: Subscription;
  produtoServicosImportados: ProdutoServico[] = [];
  filtroButton: boolean = false;
  filtroAccordion: boolean = false;
  unidadesMedidaAlmoxarifadoSelecionada: string = '';
  unidadesMedidaSelecionada: string = '';
  tipoProdutoSelecionado: string = '';
  idSelecionado: string = '';
  @ViewChild('importFile') importFile: ElementRef;

  ngOnInit(): void {
    this.pagina = 1;
    this.tamanho_pagina = 10;

    this.produtoServicoService
      .listarTodosPaginado(this.pagina, this.tamanho_pagina, this.searchItem)
      .subscribe((resp) => {
        this.produtoServicos = resp;
        this.quantidade_total = resp[0].quantidade_total!;
      });
  }

  mudarPagina() {
    this.produtoServicoService
      .listarTodosPaginado(this.pagina, this.tamanho_pagina, this.searchItem)
      .subscribe((resp) => {
        this.produtoServicos = resp;
        this.quantidade_total = resp[0].quantidade_total!;
      });
  }

  pesquisarItem() {
    this.searchTerms.next(this.searchItem);
  }

  ngOnDestroy(): void {
    this.pesquisarSubscription.unsubscribe();
  }

  public trackItem(index: number, item: ProdutoServico) {
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
        this.produtoServicoService.deletar(id).subscribe({
          next: () => {
            this.produtoServicos = this.produtoServicos.filter((produtoServico) => produtoServico.id != id);
            Swal.fire('Excluído!', 'Produto ou serviço excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir este produto ou serviço!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  async importarExcel(evt: any) {
    if (!evt.target.files[0]) {
      return;
    }
    Swal.showLoading();
    const CellA1 =
      'PLANILHA PADRÃO DE IMPORTAÇÃO DE DADOS PARA O SISTEMA COMPRA ÁGIL - MODELO IMPORTAÇÃO PRODUTO / SERVIÇO';
    const CellA2 = 'DESCRIÇÃO DETALHADA DO ITEM';
    const CellB2 = 'UNID';
    const CellC2 = 'VALOR';
    const CellD2 = 'DESCRIÇÃO ALMOXARIFADO';
    const CellE2 = 'UNID ALMOXARIFADO';
    const CellF2 = 'CASAS DEC. UND.';
    const CellG2 = 'CASAS DEC. VALOR';
    const CellH2 = 'TIPO PRODUTO';

    let convertedExcel = await this.baseService.generateJsonFromExcel(evt, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

    if (
      convertedExcel[0].A != CellA1 ||
      convertedExcel[1].A != CellA2 ||
      convertedExcel[1].B != CellB2 ||
      convertedExcel[1].C != CellC2 ||
      convertedExcel[1].D != CellD2 ||
      convertedExcel[1].E != CellE2 ||
      convertedExcel[1].F != CellF2 ||
      convertedExcel[1].G != CellG2 ||
      convertedExcel[1].H != CellH2
    ) {
      Swal.fire('Erro ao importar arquivo!', 'As colunas de cabeçalho não estão seguindo o modelo', 'error');
      this.importFile.nativeElement.value = '';
      return;
    }

    convertedExcel.shift();
    convertedExcel.shift();

    let unidades = await firstValueFrom(this.unidadeMedidaService.listarTodos());
    let tiposProduto = await firstValueFrom(this.tipoProdutoService.listarTodos());
    let tiposProdutoId = tiposProduto.map((tipoproduto) => tipoproduto.id);
    let unidadesFiltradas = unidades.map((unidade) => unidade.sigla);

    var linhaErrada: DataRow;
    let validateAll;

    if (convertedExcel.length == 0) {
      Swal.fire('Erro!', 'Arquivo não contém registros', 'error');
      validateAll = false;
    } else {
      validateAll = convertedExcel.every((element) => {
        linhaErrada = element;

        let erroVazio =
          element.A == '' ||
          element.B == '' ||
          element.C === '' ||
          element.D == '' ||
          element.E == '' ||
          element.F === '' ||
          element.G === '' ||
          element.H == ''
            ? true
            : false;

        let erroUnidadeMedida = !unidadesFiltradas.includes(element.B) || !unidadesFiltradas.includes(element.E);
        let erroTipoProduto = !tiposProdutoId.includes(parseInt(element.H));
        if (erroVazio) {
          Swal.fire(
            'Erro ao importar arquivo!',
            `Coluna(s) em branco. Erro na linha: ${linhaErrada!.__rowNum__ + 1} `,
            'error'
          );
          return false;
        } else if (erroUnidadeMedida) {
          Swal.fire(
            'Erro ao importar arquivo!',
            `Erro na unidade medida, unidade de medida não cadastrada na base de dados. Erro na linha: ${
              linhaErrada!.__rowNum__ + 1
            } `,
            'error'
          );
          return false;
        } else if (erroTipoProduto) {
          Swal.fire(
            'Erro ao importar arquivo!',
            `Erro no tipo do produto, tipo do produto não cadastrado na base de dados. Erro na linha: ${
              linhaErrada!.__rowNum__ + 1
            } `,
            'error'
          );
          return false;
        }
        return true;
      });
    }

    if (validateAll) {
      Swal.fire({
        title: 'Arquivo validado com sucesso!',
        text: 'Deseja realizar a importação?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Aguarde um momento...',
            text: 'Importando produtos...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          /*convertedExcel.forEach((produto) => {
            let produtosImportado: ProdutoServico = {
              descricao: produto.A,
              unidade_medida_id: unidades.find((unidade) => unidade.sigla == produto.B)!.id as number,
              valor_referencia: parseFloat(produto.C),
              descricao_almoxarifado: produto.D,
              unidade_medida_almoxarifado_id: unidades.find((unidade) => unidade.sigla == produto.E)!.id as number,
              qtd_casas_decimais_quantidade: parseInt(produto.F),
              qtd_casas_decimais_valor: parseInt(produto.G),
              tipo_de_produto_servico_id: parseInt(produto.H),
            };
            this.produtoServicosImportados.push(produtosImportado);
          });*/

          this.produtoServicoService.importarProduto(this.produtoServicosImportados).subscribe({
            next: () => {},
            error: () => {
              Swal.fire({
                title: 'Erro!',
                text: 'Algo deu errado ao importar produtos!',
                icon: 'error',
                showConfirmButton: true,
              }).then(() => {
                window.location.reload();
              });
            },
            complete: () => {
              Swal.fire({
                title: 'Importado!',
                text: 'Produtos importados com sucesso!',
                icon: 'success',
                showConfirmButton: true,
              }).then(() => {
                window.location.reload();
              });
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.importFile.nativeElement.value = '';
          Swal.fire('Cancelado!', 'Importação cancelada', 'error');
        }
      });
    } else {
      this.importFile.nativeElement.value = '';
    }
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
      unidade_medida_almoxarifado: this.unidadesMedidaAlmoxarifadoSelecionada,
      unidade_medida: this.unidadesMedidaSelecionada,
      tipo_produto: this.tipoProdutoSelecionado,
      id: this.idSelecionado,
    };

    this.produtoServicoService.filtrar(parameters).subscribe({
      next: (produtoServicos) => {
        this.produtoServicos = produtoServicos;
        // this.rerender();
        Swal.close();
      },
      error: () => {
        Swal.fire('Algo deu errado!', 'Não foi possivel filtrar os produtos!', 'error');
      },
    });
  }

  limparFiltros() {
    this.unidadesMedidaSelecionada = '';
    this.unidadesMedidaAlmoxarifadoSelecionada = '';
    this.tipoProdutoSelecionado = '';
    this.idSelecionado = '';
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
