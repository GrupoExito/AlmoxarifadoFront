import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { dtOptions } from '@pages/shared/globals';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SaidaMaterialItemService } from '../_services/saida-material-itens.service';
import { SaidaMaterialService } from '../_services/saida-material.service';
import {
  ListarItemDisponivel,
  ListarLoteDatavalidade,
  LoteLinha,
  SaidaMaterialItem,
  SaldoItemGeral,
  SaldoItemLoteDatavalidade,
} from '../_models/saida-material-itens.model';
import { SaidaMaterial } from '../_models/saida-material.model';
import { BaseService } from '@pages/shared/services/base.service';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';
import * as bootstrap from 'bootstrap';
import { PedidoCompraItem } from '@pages/compra/_models/pedido-compra-item.model';

@Component({
  selector: 'app-saida-material-itens',
  templateUrl: './saida-material-itens.component.html',
  styleUrls: ['../saida-material.component.scss'],
})
export class SaidaMaterialItemComponent implements OnInit {
  constructor(
    private baseService: BaseService,
    private saidaMaterialService: SaidaMaterialService,
    private saidaMaterialItemService: SaidaMaterialItemService,
    private pedidoCompraService: PedidoCompraService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  saidaMaterial: SaidaMaterial;
  produtosServico: SaidaMaterialItem[];
  produtoServico: SaidaMaterialItem | undefined;
  selectedProdutoServico: SaidaMaterialItem | undefined;

  saidaItens: SaidaMaterialItem[];
  dtTrigger = new Subject<any>();
  dtOptions: any;
  saida_id: number;
  apostilamento: boolean;
  permissaoStatus: number[];
  selectedLoteData: SaldoItemLoteDatavalidade | undefined;

  //itemDisponivel: ListarItemDisponivel[];
  saldoGeralItem: SaldoItemGeral;
  ItemlotesDatas: ListarLoteDatavalidade[] = [];
  saldoItemLoteData: SaldoItemLoteDatavalidade;

  compras: PedidoCompra[];
  selectedPedidoId: number;
  itensPedido: PedidoCompraItem;

  codigoBarra: string = '';

  //gerado na remodelação
  addProdutoForm!: FormGroup;
  get lotesFormArray(): FormArray { return this.addProdutoForm.get('lotes') as FormArray; }
  get lotesControls() { return this.lotesFormArray.controls as FormGroup[]; }

  /** Controle de UI */
  exibirTabelaLotes = false;

  itemDisponivel: Array<any> = []; // [{ id, descricao, item_codigo, ... }]
  //saidaMaterial?: { status_id: number }; // já existia no seu template

  /** Subs */
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.saida_id = this.saidaMaterialService.getRouteId()!;

    this.addProdutoForm = this.fb.group({
      produto_servico_id: [null, Validators.required],
      lotes: this.fb.array([]) // preenchido ao selecionar item
    });

    this.saidaMaterialService.data$.subscribe({
      next: (res) => {
        if (res) {
          this.saidaMaterial = res.saidaMaterial;
        }
      },
    });

    this.listarProdutosAdicionados();
    this.listarProdutosDisponiveis();
    
  }

/*
  adicionar(): void {
    Swal.showLoading();
    const quantidade = this.addProdutoForm.get('quantidade')!.value;
    if (quantidade === 0) {
      Swal.fire('Erro!', 'A quantidade não pode ser 0.', 'error');
      return;
    }

    
    const produto_id = this.selectedLoteData?.item_codigo;
    const numero_lote = this.selectedLoteData?.numero_lote;
    const data_validade = this.selectedLoteData?.data_validade;
    
    /*
    const saldoUtilizado = this.saidaItens.find((itens) => {
      if (itens.item_codigo !== produto_id) return false;
      if (itens.numero_lote !== numero_lote) return false;
      if (itens.data_validade !== data_validade) return false;
      return true;
    })?.quantidade;

    console.log(saldoUtilizado, 'saldoUtilizado');
    const saldo = this.selectedLoteData?.saldo_lote_data_validade
      ? this.selectedLoteData.saldo_lote_data_validade
      : this.selectedLoteData!.entrada_lote_data_validade;

    if (
      this.saldoItemLoteData.saldo_lote_data_validade &&
      parseFloat(quantidade) > this.saldoItemLoteData.saldo_lote_data_validade
    ) {
      Swal.fire('Saldo insuficiente!', 'Quantidade é superior ao saldo!', 'error');
      return;
    } else if (
      this.selectedLoteData?.entrada_lote_data_validade &&
      parseFloat(quantidade) > this.selectedLoteData?.entrada_lote_data_validade
    ) {
      Swal.fire('Saldo insuficiente!', 'Quantidade é superior ao saldo!', 'error');
      return;
    } else if (saldoUtilizado + quantidade > saldo!) {
      Swal.fire('Saldo insuficiente!', 'Quantidade é superior ao saldo!', 'error');
      return;
    } else if (saldoUtilizado! + quantidade > this.saldoItemLoteData.saldo_lote_data_validade!) {
      Swal.fire('Saldo insuficiente!', 'Quantidade é superior ao saldo!', 'error');
      return;
    } else if (quantidade > this.saldoItemLoteData.saldo_lote_data_validade!) {
      Swal.fire('Saldo insuficiente!', 'Quantidade é superior ao saldo!', 'error');
      return;
    }

    const saidaItem: SaidaMaterialItem = {
      quantidade: quantidade,
      produto_servico_id: produto_id,
      saida_id: this.saida_id,
      //valor: this.produtoServico!.valor,
      data_validade: this.selectedLoteData!.data_validade
        ? this.baseService.formatDate(this.selectedLoteData!.data_validade)
        : null,
      numero_lote: this.selectedLoteData!.numero_lote,
    };

    this.saidaMaterialItemService.criar(saidaItem).subscribe({
      next: () => {
        this.listarProdutosAdicionados();
        this.listarProdutosDisponiveis();
        this.selectedProdutoServico = undefined;
        this.produtoServico = undefined;
        Swal.fire('Adicionado!', 'Produto adicionado à saída com sucesso!', 'success');
        this.addProdutoForm.reset();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
*/
  public trackItem(index: number, item: SaidaMaterialItem) {
    return item.id;
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  listarProdutosDisponiveis() {
    this.saidaMaterialItemService.listarItemDisponivel(this.saidaMaterial.id!).subscribe({
      next: (itemDisponivel) => {
        this.itemDisponivel = itemDisponivel.filter((item) => item.saldo !== 0);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  valorItemEntrada() {
    // pega o valor do item na entrada, junto com o lote e a data de validade
    if (this.selectedProdutoServico?.item_codigo!) {
      const saidaItemValor: SaidaMaterialItem = {
        data_validade: this.selectedProdutoServico.data_validade,
        produto_servico_id: this.selectedProdutoServico.item_codigo,
        numero_lote: this.selectedProdutoServico.numero_lote,
      };
      this.saidaMaterialItemService.consultarUltimoValorEntrada(saidaItemValor).subscribe({
        next: (produtoServico) => {
          this.produtoServico = produtoServico;
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.saidaMaterialItemService
        .listarLoteDataValidade(this.selectedProdutoServico.item_codigo, this.selectedProdutoServico.id!)
        .subscribe({
          next: (ItensloteData) => {
            this.ItemlotesDatas = ItensloteData.filter((item) => item.saldo! > 0);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  consultarProdutoSaldos(produtoId: number, id: number) {
    this.saidaMaterialItemService.ConsultarSaldoGeral(produtoId, id).subscribe({
      next: (produtosServico) => {
        this.saldoGeralItem = produtosServico;
      },
      error: (error) => {
        console.log(error);
      },
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
        console.log(this.saldoItemLoteData, 'saldoItemLoteData');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  listarProdutosAdicionados() {
  this.saidaMaterialItemService.listarItemPorSaida(this.saida_id).subscribe({
    next: (saidaItens) => {
      console.log(saidaItens, 'saidaItens');
      this.saidaItens = saidaItens;

      // Se a tabela já foi inicializada, destrói e recria
      if (this.dtElement && this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();          // remove a instância atual
          this.dtTrigger.next(null);         // recria com os novos dados
        });
      } else {
        // Primeira carga
        this.dtTrigger.next(null);
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
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
        this.saidaMaterialItemService.deletar(id).subscribe({
          next: () => {
            this.saidaItens = this.saidaItens.filter((item) => item.id != id);
            let header = this.saidaMaterialService.smDataEtapasHeader.getValue();
            header!.quantidade_itens = this.saidaItens.length;
            this.saidaMaterialService.smDataEtapasHeader.next(header);
            this.listarProdutosDisponiveis();
            this.rerender();
            this.selectedProdutoServico = undefined;
            this.produtoServico = undefined;
            Swal.fire('Excluído!', 'Item excluído!', 'success');
          },
          error: () => {
            Swal.fire('Algo deu errado!', 'Não foi possivel excluir esse Item!', 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado!', 'A informação está segura!', 'error');
      }
    });
  }

  atualizarQuantidade(item: SaidaMaterialItem) {
    console.log(item, 'item para atualizar quantidade');
  const saldoDisponivel = item.saldo_disponivel; // vem do item

  Swal.fire({
    title: 'Digite a nova quantidade. Max:(' + (saldoDisponivel != null ? saldoDisponivel : 'N/A') + ')',
    input: 'text',
    inputValue: item.quantidade ? String(item.quantidade).replace('.', ',') : '',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Atualizar',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: (valorDigitado) => {
      const valor = (valorDigitado || '').toString().trim();

      // Aceita só números com opcional vírgula/ponto e até 4 casas decimais
      const regex = /^\d+([.,]\d{1,4})?$/;
      if (!regex.test(valor)) {
        Swal.showValidationMessage('Informe um número válido com até 4 casas decimais.');
        return false;
      }

      // Normaliza vírgula para ponto e converte
      const qtd = parseFloat(valor.replace(',', '.'));

      if (isNaN(qtd) || qtd <= 0) {
        Swal.showValidationMessage('A quantidade deve ser maior que zero.');
        return false;
      }

      if (saldoDisponivel != null && qtd > saldoDisponivel) {
        Swal.showValidationMessage(
          `Quantidade não pode ser maior que o saldo disponível (${saldoDisponivel}).`
        );
        return false;
      }

      const body = {
        id: item.id,
        quantidade: qtd,
      };

      // Importante: retornar uma Promise para o SweetAlert controlar o loader
      return new Promise<void>((resolve, reject) => {
        this.saidaMaterialItemService.atualizarQuantidadeitem(body).subscribe({
          next: () => {
            resolve();
          },
          error: (error) => {
            console.error(error);
            Swal.showValidationMessage(
              error?.error?.message || 'Falha ao atualizar a quantidade.'
            );
            reject(error);
          },
        });
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      this.listarProdutosAdicionados();
      this.listarProdutosDisponiveis();
      Swal.fire('Atualizado!', 'Item atualizado com sucesso!', 'success');
    }
  });
}

  listarItensPedido() {
    this.pedidoCompraService.listarPedidoCompraAlmoxarifado().subscribe({
      next: (compras) => {
        this.compras = compras;
        console.log(compras, 'compras');
        const modal = new bootstrap.Modal(document.getElementById('modalSaidaPedido') as HTMLElement);
        modal.show();
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
            this.listarProdutosAdicionados();
            //document.location.reload();
          });
        },
        error: (error) => {
          console.error('Erro ao carregar pedidos:', error);
          Swal.fire('Erro!', 'Não foi possível carregar os pedidos de compra', 'error');
        },
      });
  }

  onEnterPressed() {
    Swal.showLoading();
    console.log(this.codigoBarra);
    const item = this.itemDisponivel.find((i) => i.codigo_barra == this.codigoBarra);
    if (item) {
      this.codigoBarra = '';
      this.selectedProdutoServico = item;
      this.valorItemEntrada();
      this.consultarProdutoSaldos(item.item_codigo!, item.id!);
      Swal.close();
    } else {
      Swal.fire('Erro!', 'Item não encontrado', 'error');
    }
  }

  //remodelagem
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

    onSelectItem(produtoId: any): void {
    if (!produtoId) {
      this.resetarLotes();
      return;
    }

    // opcional: recuperar o item selecionado caso precise de metadados
    // const itemSel = this.itemDisponivel.find(x => x.id === produtoId);

    // Chame seu backend para buscar os lotes desse produto
    this.carregarLotesDoProduto(produtoId.item_codigo);
  }

    /**
   * Busca lotes/validades no backend e popula o FormArray
   * Substitua a chamada pelo seu service real.
   */
  private carregarLotesDoProduto(produtoId: number): void {
    console.log('Carregando lotes para produto ID:', produtoId);
    this.resetarLotes();

    this.subs.push(
        this.saidaMaterialItemService.listarLotesPorProdutoSaida(produtoId, this.saida_id).subscribe(lotes => 
          this.preencherLotes(lotes)
        )
    );
    /*const mock: LoteLinha[] = [
      { id: 101, numero_lote: 'A1', data_validade: '2026-03-10', saldo_total: 120, saldo_disponivel: 80,  descricao: 'Álcool 70% 1L' },
      { id: 102, numero_lote: 'B7', data_validade: '2026-05-20', saldo_total: 50,  saldo_disponivel: 50,  descricao: 'Álcool 70% 1L' },
      { id: 103, numero_lote: 'C3', data_validade: '2025-12-15', saldo_total: 200, saldo_disponivel: 0,   descricao: 'Álcool 70% 1L' },
    ];
    this.preencherLotes(mock);*/
    // --- FIM MOCK ---
  }

    private preencherLotes(lotes: LoteLinha[]): void {
    if (!lotes?.length) {
      this.exibirTabelaLotes = true; // mostra tabela com "sem lotes"
      return;
    }

    lotes.forEach(l => this.lotesFormArray.push(this.criarLinhaLote(l)));
    this.exibirTabelaLotes = true;
  }

    private criarLinhaLote(l: LoteLinha): FormGroup {
    return this.fb.group(
      {
        id: new FormControl(l.id),
        numero_lote: new FormControl(l.numero_lote),
        data_validade: new FormControl(l.data_validade),
        saldo_total: new FormControl(l.saldo_total),
        saldo_disponivel: new FormControl(l.saldo_disponivel),
        descricao: new FormControl(l.descricao),
        quantidade: new FormControl('', [
          this.quantidadeOpcionalValida(l.saldo_disponivel)
        ])
      }
    );
  }

    /**
   * Validador: permite vazio/zero; se > 0, deve ser número válido PT-BR e <= saldo_disponivel.
   */
  private quantidadeOpcionalValida(maxDisponivel: number): ValidatorFn {
    return (control) => {
      const raw = control.value;
      if (raw === null || raw === undefined || raw === '' || this.parseNumeroPtBr(raw) === 0) {
        return null; // vazio/zero = linha não selecionada
      }

      const qtd = this.parseNumeroPtBr(raw);
      if (isNaN(qtd) || qtd < 0) {
        return { quantidadeInvalida: true };
      }
      if (qtd > maxDisponivel) {
        return { acimaDoSaldoDisponivel: true };
      }
      return null;
    };
  }

  /**
   * Converte string com máscara pt-BR ("1.234,56") para number (1234.56)
   */
  private parseNumeroPtBr(v: any): number {
    if (typeof v === 'number') return v;
    if (typeof v !== 'string') return NaN;
    // remove separadores de milhar
    const s = v.replace(/\./g, '').replace(',', '.').trim();
    return parseFloat(s);
  }

  /**
   * Getter para habilitar o botão "Adicionar"
   * True se existir pelo menos 1 linha com quantidade > 0 e valida.
   */
  get temQuantidadeParaAdicionar(): boolean {
    return this.lotesControls.some(ctrl => {
      const raw = ctrl.get('quantidade')?.value;
      const qtd = this.parseNumeroPtBr(raw);
      const max = Number(ctrl.get('saldo_disponivel')?.value) || 0;
      return !!qtd && qtd > 0 && qtd <= max && ctrl.valid;
    });
  }

  get selectedDescricao(): string | null {
    const g = (this.lotesControls && this.lotesControls.length > 0) ? this.lotesControls[0] : null;
    return g?.get('descricao')?.value ?? null;
  }
  /**
   * Clique no botão "Adicionar"
   * Filtra apenas linhas com quantidade > 0 e envia para sua API.
   */
  adicionar(): void {
  if (!this.temQuantidadeParaAdicionar) {
    Swal.fire('Atenção', 'Informe a quantidade em pelo menos um lote válido.', 'warning');
    return;
  }

  const saidaId = this.saida_id;

  const lista: SaidaMaterialItem[] = this.lotesControls
    .map(ctrl => {
      const qtd = this.parseNumeroPtBr(ctrl.get('quantidade')?.value || 0);
      const entradaItemId = Number(ctrl.get('id')?.value); // id do lote/entrada
      return {
        saida_material_id: saidaId,
        entrada_material_item_id: entradaItemId,
        quantidade: qtd
      } as SaidaMaterialItem;
    })
    .filter(x => (x.quantidade ?? 0) > 0);

  if (!lista.length) {
    Swal.fire('Atenção', 'Nenhuma quantidade válida informada.', 'warning');
    return;
  }

  this.subs.push(
    this.saidaMaterialItemService.criar(lista).subscribe({
      next: () => {
        this.listarProdutosAdicionados();
        this.listarProdutosDisponiveis();
        Swal.fire('Adicionado!', 'Itens adicionados à saída com sucesso!', 'success');

        // limpar UI
        this.addProdutoForm.get('produto_servico_id')?.reset(null);
        this.resetarLotes();
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Erro', error?.error?.message || 'Falha ao adicionar itens.', 'error');
      }
    })
  );
}

  private resetarLotes(): void {
    while (this.lotesFormArray.length) this.lotesFormArray.removeAt(0);
    this.exibirTabelaLotes = false;
  }
}
