import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription, forkJoin, of } from 'rxjs';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

import { dtOptions } from '@pages/shared/globals';
import { BaseService } from '@pages/shared/services/base.service';

import { SaidaMaterialItemService } from '../_services/saida-material-itens.service';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';

import {
  LoteLinha,
  SaidaMaterialItem,
  SaldoItemGeral,
  SaldoItemLoteDatavalidade,
  ListarLoteDatavalidade,
} from '../_models/saida-material-itens.model';
import { SaidaMaterial } from '../_models/saida-material.model';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';
import { PedidoCompraItem } from '@pages/compra/_models/pedido-compra-item.model';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-saida-material-itens',
  templateUrl: './saida-material-itens.component.html',
  styleUrls: ['../saida-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaidaMaterialItemComponent implements OnInit, OnDestroy {
  constructor(
    private baseService: BaseService,
    private saidaMaterialService: SaidaMaterialService,
    private saidaMaterialItemService: SaidaMaterialItemService,
    private pedidoCompraService: PedidoCompraService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  private destroy$ = new Subject<void>();
  private destroyed = false;

  // Estado principal
  saidaMaterial!: SaidaMaterial;
  saida_id!: number;

  saidaItens: SaidaMaterialItem[] = [];
  itemDisponivel: any[] = []; // itens do ng-select

  // DataTables
  dtTrigger = new Subject<any>();
  dtOptions: any;

  // Outros estados (mantidos)
  produtosServico!: SaidaMaterialItem[];
  produtoServico: SaidaMaterialItem | undefined;
  selectedProdutoServico: SaidaMaterialItem | undefined;

  saldoGeralItem!: SaldoItemGeral;
  ItemlotesDatas: ListarLoteDatavalidade[] = [];
  saldoItemLoteData!: SaldoItemLoteDatavalidade;

  selectedLoteData: SaldoItemLoteDatavalidade | undefined;

  compras: PedidoCompra[] = [];
  selectedPedidoId!: number;
  itensPedido!: PedidoCompraItem;

  codigoBarra = '';

  private selectedItemCodigo: number | null = null;

  // Form de adicionar itens por lote
  addProdutoForm!: FormGroup;
  get lotesFormArray(): FormArray {
    return this.addProdutoForm.get('lotes') as FormArray;
  }
  get lotesControls() {
    return this.lotesFormArray.controls as FormGroup[];
  }

  exibirTabelaLotes = false;

  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.saida_id = this.saidaMaterialService.getRouteId()!;

    this.addProdutoForm = this.fb.group({
      produto_servico_id: [null, Validators.required],
      lotes: this.fb.array([]),
    });

    // importante: data$ é stream, então deve ser unsub no destroy
    this.subs.push(
      this.saidaMaterialService.data$.subscribe({
        next: (res) => {
          if (!res) return;
          this.saidaMaterial = res.saidaMaterial;

          // carrega tela apenas quando saidaMaterial existir
          this.refreshTela();
          this.cd.markForCheck();
        },
        error: (err) => console.error(err),
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.destroy$.next();
    this.destroy$.complete();

    this.subs.forEach(s => s.unsubscribe());
  }

  // TrackBy mais seguro
  trackItem(index: number, item: SaidaMaterialItem) {
    return item.id ?? item.entrada_material_item_id ?? index;
  }

  // =========================
  // Centralizador de refresh
  // =========================
  private refreshTela(): void {
  if (!this.saida_id || !this.saidaMaterial?.id) return;

  forkJoin({
    itens: this.saidaMaterialItemService.listarItemPorSaida(this.saida_id),
    disponiveis: this.saidaMaterialItemService.listarItemDisponivel(this.saidaMaterial.id!)
  })
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: ({ itens, disponiveis }) => {
      // 1) lista principal (imutável + ordenada)
      this.saidaItens = [...(itens ?? [])].sort((a, b) =>
        (a.item_descricao ?? '').localeCompare(b.item_descricao ?? '')
      );

      // 2) select
      this.itemDisponivel = (disponiveis ?? []).filter(x => x.saldo !== 0);

      // 3) header (sempre aqui)
      const valorTotal = this.saidaItens.reduce((acc, it) => {
        const qtd = Number(it.quantidade) || 0;
        const valor = Number(it.valor) || 0;
        return acc + (valor * qtd);
      }, 0);

      this.saidaMaterialService.smDataEtapasHeader.next({
        quantidade_itens: this.saidaItens.length,
        valorTotal
      });

      // 4) datatable
      this.rerenderDatatableSafe();

      // 5) OnPush
      this.cd.markForCheck();
    },
    error: (err) => console.error(err),
  });
}


private rerenderDatatableSafe(): void {
  if (this.destroyed) return;

  if (this.dtElement?.dtInstance) {
    this.dtElement.dtInstance.then((dt: DataTables.Api) => {
      if (this.destroyed) return;
      dt.destroy();
      this.dtTrigger.next(null);
    }).catch(() => {
      if (this.destroyed) return;
      this.dtTrigger.next(null);
    });
  } else {
    this.dtTrigger.next(null);
  }
}

  // =========================
  // Fluxo: adicionar itens por lote
  // =========================
  adicionar(): void {
    if (!this.temQuantidadeParaAdicionar) {
      Swal.fire('Atenção', 'Informe a quantidade em pelo menos um lote válido.', 'warning');
      return;
    }

    const saidaId = this.saida_id;

    const selecionados: SaidaMaterialItem[] = this.lotesControls
      .map((ctrl) => {
        const qtd = this.parseNumeroPtBr(ctrl.get('quantidade')?.value || 0);

        return {
          saida_material_id: saidaId,
          entrada_material_item_id: Number(ctrl.get('id')?.value),
          numero_lote: ctrl.get('numero_lote')?.value,
          data_validade: ctrl.get('data_validade')?.value,
          quantidade: qtd,
          produto_servico_id: this.addProdutoForm.get('produto_servico_id')?.value,
        };
      })
      .filter((x) => (x.quantidade ?? 0) > 0);

    if (!selecionados.length) {
      Swal.fire('Atenção', 'Nenhuma quantidade válida informada.', 'warning');
      return;
    }

    const normDate = (d: any) => {
      if (!d) return null;
      const dt = new Date(d);
      return isNaN(dt.getTime()) ? String(d) : dt.toISOString().slice(0, 10);
    };

    const makeKey = (x: SaidaMaterialItem) => {
      if (x.entrada_material_item_id) return `E:${x.entrada_material_item_id}`;
      const prod = x.produto_servico_id ?? x.item_codigo ?? '0';
      return `P:${prod}|L:${x.numero_lote ?? ''}|V:${normDate(x.data_validade) ?? ''}`;
    };

    const toCreate: SaidaMaterialItem[] = [];
    const toUpdate: Array<{ id: number; quantidade: number }> = [];

    for (const novo of selecionados) {
      const keyNovo = makeKey(novo);
      const existente = (this.saidaItens || []).find((si) => makeKey(si) === keyNovo);

      if (existente?.id) {
        const qtdExistente = Number(existente.quantidade) || 0;
        const qtdNova = Number(novo.quantidade) || 0;
        toUpdate.push({ id: existente.id, quantidade: qtdExistente + qtdNova });
      } else {
        toCreate.push(novo);
      }
    }

    Swal.showLoading();

    const reqCreate$ = toCreate.length ? this.saidaMaterialItemService.criar(toCreate) : of(null);
    const reqUpdate$ = toUpdate.length
      ? forkJoin(toUpdate.map((b) => this.saidaMaterialItemService.atualizarQuantidadeitem(b)))
      : of(null);

    this.subs.push(
      forkJoin([reqCreate$, reqUpdate$]).subscribe({
        next: async () => {
          await Swal.fire('Ok!', 'Itens adicionados/atualizados com sucesso.', 'success');

          // agora atualiza tudo com a tela “livre”
          this.refreshTela();
          this.refreshLotesSelecionado();

          this.lotesControls.forEach(ctrl => ctrl.get('quantidade')?.reset());
          this.cd.markForCheck();
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Erro', error?.error?.message || 'Falha ao adicionar/atualizar itens.', 'error');
        },
      })
    );
  }

  private resetarLotes(): void {
    while (this.lotesFormArray.length) this.lotesFormArray.removeAt(0);
    this.exibirTabelaLotes = false;
  }

  // =========================
  // Atualizar quantidade (max = atual + disponível)
  // =========================
  atualizarQuantidade(item: SaidaMaterialItem) {
    const qtdAtual = Number(item.quantidade) || 0;
    const saldoDisponivel = Number(item.saldo_disponivel) || 0;
    const maxPermitido = qtdAtual + saldoDisponivel;

    Swal.fire({
      title: `Digite a nova quantidade. Máx: (${maxPermitido})`,
      input: 'text',
      inputValue: qtdAtual ? String(qtdAtual).replace('.', ',') : '',
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Atualizar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (valorDigitado) => {
        const valor = (valorDigitado || '').toString().trim();
        const regex = /^\d+([.,]\d{1,4})?$/;

        if (!regex.test(valor)) {
          Swal.showValidationMessage('Informe um número válido com até 4 casas decimais.');
          return false;
        }

        const qtd = parseFloat(valor.replace(',', '.'));
        if (isNaN(qtd) || qtd <= 0) {
          Swal.showValidationMessage('A quantidade deve ser maior que zero.');
          return false;
        }

        if (qtd > maxPermitido) {
          Swal.showValidationMessage(`Quantidade não pode ser maior que o máximo permitido (${maxPermitido}).`);
          return false;
        }

        return new Promise<void>((resolve, reject) => {
          this.saidaMaterialItemService
            .atualizarQuantidadeitem({ id: item.id, quantidade: qtd })
            .subscribe({
              next: () => resolve(),
              error: (error) => {
                Swal.showValidationMessage(error?.error?.message || 'Falha ao atualizar a quantidade.');
                reject(error);
              },
            });
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.refreshTela();
        this.refreshLotesSelecionado();
        Swal.fire('Atualizado!', 'Item atualizado com sucesso!', 'success');
      }
    });
  }

  // =========================
  // Deletar
  // =========================
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
        this.saidaMaterialItemService.deletar(id).subscribe({
          next: () => {
            // atualiza header se você precisar
            /*const header = this.saidaMaterialService.smDataEtapasHeader.getValue();
            if (header) {
              header.quantidade_itens = Math.max(0, (header.quantidade_itens ?? 0) - 1);
              this.saidaMaterialService.smDataEtapasHeader.next(header);
            }*/

            this.refreshTela();
            this.refreshLotesSelecionado();
            this.selectedProdutoServico = undefined;
            this.produtoServico = undefined;

            Swal.fire('Excluído!', 'Item excluído!', 'success');
          },
          error: () => Swal.fire('Algo deu errado!', 'Não foi possivel excluir esse Item!', 'error'),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  // =========================
  // Saída por pedido
  // =========================
  listarItensPedido() {
    this.pedidoCompraService.listarPedidoCompraAlmoxarifado().subscribe({
      next: (compras) => {
        this.compras = compras;
        const modal = new bootstrap.Modal(document.getElementById('modalSaidaPedido') as HTMLElement);
        modal.show();
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        Swal.fire('Erro!', 'Não foi possível carregar os pedidos de compra', 'error');
      },
    });
  }

  adicionarItensPedido() {
    this.saidaMaterialItemService
      .InserirPedidoCompraItens(this.saida_id, this.selectedPedidoId, this.saidaMaterial.almoxarifado_id)
      .subscribe({
        next: () => {
          Swal.fire('Adicionado!', 'Itens do pedido adicionado!', 'success').then(() => {
            this.refreshTela();
          });
        },
        error: (error) => {
          console.error('Erro ao adicionar itens do pedido:', error);
          Swal.fire('Erro!', 'Não foi possível adicionar os itens do pedido', 'error');
        },
      });
  }

  // =========================
  // Leitor de código de barra (mantido)
  // =========================
  onEnterPressed() {
    Swal.showLoading();
    const item = this.itemDisponivel.find((i) => i.codigo_barra == this.codigoBarra);

    if (item) {
      this.codigoBarra = '';
      this.selectedProdutoServico = item;
      this.valorItemEntrada();
      this.consultarProdutoSaldos(item.item_codigo!, item.id!);
      Swal.close();
      this.cd.markForCheck();
    } else {
      Swal.fire('Erro!', 'Item não encontrado', 'error');
    }
  }

  // =========================
  // Métodos de saldo/valor (mantidos)
  // =========================
  valorItemEntrada() {
    if (this.selectedProdutoServico?.item_codigo) {
      const saidaItemValor: SaidaMaterialItem = {
        data_validade: this.selectedProdutoServico.data_validade,
        produto_servico_id: this.selectedProdutoServico.item_codigo,
        numero_lote: this.selectedProdutoServico.numero_lote,
      };

      this.saidaMaterialItemService.consultarUltimoValorEntrada(saidaItemValor).subscribe({
        next: (produtoServico) => {
          this.produtoServico = produtoServico;
          this.cd.markForCheck();
        },
        error: (error) => console.log(error),
      });

      this.saidaMaterialItemService
        .listarLoteDataValidade(this.selectedProdutoServico.item_codigo, this.selectedProdutoServico.id!)
        .subscribe({
          next: (ItensloteData) => {
            this.ItemlotesDatas = ItensloteData.filter((item) => item.saldo! > 0);
            this.cd.markForCheck();
          },
          error: (error) => console.log(error),
        });
    }
  }

  consultarProdutoSaldos(produtoId: number, id: number) {
    this.saidaMaterialItemService.ConsultarSaldoGeral(produtoId, id).subscribe({
      next: (produtosServico) => {
        this.saldoGeralItem = produtosServico;
        this.cd.markForCheck();
      },
      error: (error) => console.log(error),
    });
  }

  consultarSaldoLote() {
    const SaldoItem: SaldoItemLoteDatavalidade = {
      id: this.selectedLoteData?.id,
      item_codigo: this.selectedLoteData?.item_codigo,
      numero_lote: this.selectedLoteData?.numero_lote,
      data_validade: this.selectedLoteData?.data_validade
        ? new Date(this.selectedLoteData.data_validade).toISOString().split('T')[0]
        : null,
    };

    this.saidaMaterialItemService.ConsultarSaldoPorLoteData(SaldoItem).subscribe({
      next: (produtosServico) => {
        this.saldoItemLoteData = produtosServico;
        this.cd.markForCheck();
      },
      error: (error) => console.log(error),
    });
  }

  // =========================
  // Seleção do item no ng-select
  // =========================
onSelectItem(item: any): void {
  if (!item) {
    this.selectedItemCodigo = null;
    this.resetarLotes();
    this.cd.markForCheck();
    return;
  }

  this.selectedItemCodigo = item.item_codigo;
  this.carregarLotesDoProduto(item.item_codigo);
}

private refreshLotesSelecionado(): void {
  if (!this.selectedItemCodigo) return;
  this.carregarLotesDoProduto(this.selectedItemCodigo);
}

  private carregarLotesDoProduto(produtoId: number): void {
    this.resetarLotes();

    this.subs.push(
      this.saidaMaterialItemService
        .listarLotesPorProdutoSaida(produtoId, this.saida_id)
        .subscribe((lotes) => {
          this.preencherLotes(lotes);
          this.cd.markForCheck();
        })
    );
  }

  private preencherLotes(lotes: LoteLinha[]): void {
    if (!lotes?.length) {
      this.exibirTabelaLotes = true;
      return;
    }

    lotes.forEach((l) => this.lotesFormArray.push(this.criarLinhaLote(l)));
    this.exibirTabelaLotes = true;
  }

  private criarLinhaLote(l: LoteLinha): FormGroup {
    return this.fb.group({
      id: new FormControl(l.id),
      data_entrada: new FormControl(l.data_entrada),
      numero_lote: new FormControl(l.numero_lote),
      data_validade: new FormControl(l.data_validade),
      saldo_total: new FormControl(l.saldo_total),
      saldo_disponivel: new FormControl(l.saldo_disponivel),
      descricao: new FormControl(l.descricao),
      quantidade: new FormControl('', [this.quantidadeOpcionalValida(l.saldo_disponivel)]),
    });
  }

  private quantidadeOpcionalValida(maxDisponivel: number): ValidatorFn {
    return (control) => {
      const raw = control.value;
      if (raw === null || raw === undefined || raw === '' || this.parseNumeroPtBr(raw) === 0) return null;

      const qtd = this.parseNumeroPtBr(raw);
      if (isNaN(qtd) || qtd < 0) return { quantidadeInvalida: true };
      if (qtd > maxDisponivel) return { acimaDoSaldoDisponivel: true };
      return null;
    };
  }

  private parseNumeroPtBr(v: any): number {
    if (typeof v === 'number') return v;
    if (typeof v !== 'string') return NaN;
    const s = v.replace(/\./g, '').replace(',', '.').trim();
    return parseFloat(s);
  }

  get temQuantidadeParaAdicionar(): boolean {
    return this.lotesControls.some((ctrl) => {
      const raw = ctrl.get('quantidade')?.value;
      const qtd = this.parseNumeroPtBr(raw);
      const max = Number(ctrl.get('saldo_disponivel')?.value) || 0;
      return !!qtd && qtd > 0 && qtd <= max && ctrl.valid;
    });
  }

  get selectedDescricao(): string | null {
    const g = this.lotesControls?.length ? this.lotesControls[0] : null;
    return g?.get('descricao')?.value ?? null;
  }

  get totalItensProduto(): number {
    return this.lotesControls.reduce((acc, ctrl) => {
      const v = Number(ctrl.get('saldo_total')?.value) || 0;
      return acc + v;
    }, 0);
  }

  get totalDisponivelProduto(): number {
    return this.lotesControls.reduce((acc, ctrl) => {
      const v = Number(ctrl.get('saldo_disponivel')?.value) || 0;
      return acc + v;
    }, 0);
  }

get totalDigitado(): number {
  return this.lotesControls.reduce((acc, ctrl) => {
    const raw = ctrl.get('quantidade')?.value;
    const qtd = this.parseNumeroPtBr(raw);
    return acc + (qtd > 0 ? qtd : 0);
  }, 0);
}
}