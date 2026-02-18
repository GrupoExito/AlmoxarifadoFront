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
  selector: 'app-saida-material-itens-autorizar',
  templateUrl: './saida-material-itens-autorizar.component.html',
  styleUrls: ['../saida-material.component.scss'],
})
export class SaidaMaterialItemAutorizarComponent implements OnInit {
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

  saldoGeralItem: SaldoItemGeral;
  ItemlotesDatas: ListarLoteDatavalidade[] = [];
  saldoItemLoteData: SaldoItemLoteDatavalidade;

  compras: PedidoCompra[];
  selectedPedidoId: number;
  itensPedido: PedidoCompraItem;

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

autorizacaoForm!: FormGroup;

  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.saida_id = this.saidaMaterialService.getRouteId()!;

    // novo form para a tabela de autorização
    this.autorizacaoForm = this.fb.group({
      itens: this.fb.array([])
    });

    this.saidaMaterialService.data$.subscribe({
      next: (res) => {
        if (res) {
          this.saidaMaterial = res.saidaMaterial;
        }
      },
    });

    this.listarProdutosAdicionados();
    //this.listarProdutosDisponiveis();
    
  }

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

      this.buildItensAutorizacaoForm(saidaItens);
      if (this.separacaoIniciada) {
        this.itensSeparados.clear(); // reseta marcações, pois a lista foi reconstruída
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


autorizar(): void {
  if (this.autorizacaoForm.invalid) {
    Swal.fire(
      'Atenção',
      'Existem quantidades autorizadas inválidas. Verifique os campos destacados.',
      'warning'
    );
    return;
  }

  const itensPayload = this.itensControls.map(group => {
    const id = group.get('id')!.value;
    const raw = (group.get('quantidade_autorizada')!.value ?? '').toString().trim();
    const qtd = raw === '' ? 0 : this.parseNumeroPtBr(raw);

    return {
      id,
      quantidade: isNaN(qtd) ? 0 : qtd
    };
  });

  Swal.fire({
    title: 'Confirmar autorização',
    text: 'Deseja autorizar os valores informados nos campos? Não será possível modificar depois.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, autorizar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
  }).then((result) => {
    if (!result.isConfirmed) {
      return;
    }

    Swal.showLoading();

    this.saidaMaterialItemService.autorizar(itensPayload).subscribe({
      next: () => {
        Swal.close();

        this.saidaMaterial.status_id = 3;
        this.saidaMaterial.status_descricao = 'Autorizado'; // ou o texto correto do seu sistema

        const atual = this.saidaMaterialService.sMData.getValue();
        this.saidaMaterialService.setSaida({
          ...(atual ?? ({} as any)),
          saidaMaterial: { ...(atual?.saidaMaterial ?? {} as any), ...this.saidaMaterial }
        });

        const valorTotalAutorizado = this.calcularValorTotalAutorizado();

          // 3) Publica no header (eMQuantidade)
          const headerAtual = this.saidaMaterialService.smDataEtapasHeader.getValue() ?? ({} as any);
          this.saidaMaterialService.smDataEtapasHeader.next({
            ...headerAtual,
            valorTotal: valorTotalAutorizado,
            quantidade_itens: this.itensControls.length,
          });

        Swal.fire('Autorizado!', 'Quantidades autorizadas com sucesso.', 'success');
        this.listarProdutosAdicionados();
      },
      error: (error) => {
        console.error(error);
        Swal.close();
        Swal.fire(
          'Erro!',
          error?.error?.message || 'Falha ao autorizar as quantidades.',
          'error'
        );
      }
    });
  });
}


entregar(): void {

  Swal.fire({
    title: 'Necessita transporte?',
    text: 'A entrega do material necessita transporte?',
    icon: 'question',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#23b349',
    denyButtonColor: '#3085d6',
    cancelButtonColor: '#eb2067',
  }).then((result) => {

    if (result.isConfirmed) {
      this.confirmarEntrega(1); // necessita transporte
    }

    if (result.isDenied) {
      this.confirmarEntrega(0); // não necessita
    }

  });
}

private confirmarEntrega(transporte: number): void {

    this.saidaMaterialService
      .entregar(this.saidaMaterial.id!, transporte)
      .subscribe({
        next: () => {
          Swal.close();

          this.saidaMaterial.status_id = 4;
          this.saidaMaterial.status_descricao = 'Entregue';

          const atual = this.saidaMaterialService.sMData.getValue();
          this.saidaMaterialService.setSaida({
            ...(atual ?? ({} as any)),
            saidaMaterial: {
              ...(atual?.saidaMaterial ?? {} as any),
              ...this.saidaMaterial
            }
          });

          Swal.fire('Entregue!', 'Material entregue com sucesso.', 'success');
          this.listarProdutosAdicionados();
        },
        error: (error) => {
          console.error(error);
          Swal.close();
          Swal.fire(
            'Erro!',
            error?.error?.message || 'Falha ao entregar o material.',
            'error'
          );
        }
      });


}


private calcularValorTotalAutorizado(): number {
  return this.itensControls.reduce((acc, g) => {
    const valorUnit = Number(g.get('valor')?.value) || 0;

    const rawQtd = (g.get('quantidade_autorizada')?.value ?? '').toString().trim();
    const qtd = rawQtd === '' ? 0 : this.parseNumeroPtBr(rawQtd);

    if (!isFinite(valorUnit) || !isFinite(qtd) || qtd <= 0) return acc;

    return acc + (valorUnit * qtd);
  }, 0);
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

  get itensFormArray(): FormArray {
    return this.autorizacaoForm.get('itens') as FormArray;
  }

  get itensControls(): FormGroup[] {
    return this.itensFormArray.controls as FormGroup[];
  }

  private buildItensAutorizacaoForm(itens: SaidaMaterialItem[]): void {
    const fa = this.fb.array([]);

    itens.forEach((item) => {
      // quantidade solicitada = item.quantidade (ajuste se tiver outro campo)
      const quantidadeSolicitada = Number(item.quantidade) || 0;

      fa.push(this.fb.group({
        id: new FormControl(item.id),
        item_codigo: new FormControl(item.item_codigo),
        item_descricao: new FormControl(item.item_descricao),
        und_descricao: new FormControl(item.und_descricao),
        quantidade_solicitada: new FormControl(quantidadeSolicitada),
        qtd_solicitada: new FormControl(item.qtd_solicitada), // para exibir na tela após autorizado
        qtd_autorizada: new FormControl(item.qtd_autorizada), // para exibir na tela após autorizado
        valor: new FormControl(item.valor ?? 0),
        // quantidade_autorizada editável: começa igual solicitada
        quantidade_autorizada: new FormControl(
          quantidadeSolicitada.toFixed(4).replace('.', ','), // já no formato amigável
          [Validators.required, this.quantidadeAutorizadaValidator(quantidadeSolicitada)]
        ),
      }));
    });

    this.autorizacaoForm.setControl('itens', fa);
  }

private quantidadeAutorizadaValidator(maxSolicitada: number): ValidatorFn {
  return (control) => {
    const raw = (control.value ?? '').toString().trim();

    // Campo em branco: deixo passar (interpreta como "sem alteração" ou trata no submit)
    if (raw === '') {
      return null;
    }

    // aceita inteiro ou decimal com até 4 casas
    const regex = /^\d+([.,]\d{1,4})?$/;
    if (!regex.test(raw)) {
      return { formatoInvalido: true };
    }

    const qtd = this.parseNumeroPtBr(raw);
    if (isNaN(qtd) || qtd < 0) {
      // não aceita negativo
      return { invalido: true };
    }

    // não pode autorizar mais do que foi solicitado
    if (qtd > maxSolicitada) {
      return { acimaSolicitado: true };
    }

    // 0 é permitido aqui: significa "não autorizar" aquele item
    return null;
  };
}

separacaoIniciada = false;

// guarda quais índices foram marcados
private itensSeparados = new Set<number>();

get todosItensSeparados(): boolean {
  return this.itensControls?.length > 0 && this.itensSeparados.size === this.itensControls.length;
}

isItemSeparado(index: number): boolean {
  return this.itensSeparados.has(index);
}

toggleItemSeparado(index: number, ev: Event): void {
  const checked = (ev.target as HTMLInputElement).checked;
  if (checked) this.itensSeparados.add(index);
  else this.itensSeparados.delete(index);
}

iniciarSeparacao(): void {
  Swal.fire({
    title: 'Iniciar separação?',
    text: 'Este procedimento não altera o status até sua finalização.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
  }).then((res) => {
    if (!res.isConfirmed) return;

    this.separacaoIniciada = true;
    this.itensSeparados.clear();
    this.cd.detectChanges();
  });
}

finalizarSeparacao(): void {
  if (!this.todosItensSeparados) {
    Swal.fire('Atenção', 'Marque todos os itens para finalizar a separação.', 'warning');
    return;
  }

  Swal.fire({
    title: 'Finalizar separação?',
    text: 'Deseja finalizar a separação?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
  }).then((res) => {
    if (!res.isConfirmed) return;

    Swal.showLoading();

    this.saidaMaterialService.disponibilizarEntrega(this.saidaMaterial.id!).subscribe({
      next: () => {
        Swal.close();

        // Atualiza SOMENTE o flag para liberar o botão Entregar
        this.saidaMaterial.disponivel_entrega = true;

        // encerra modo separação
        this.separacaoIniciada = false;
        this.itensSeparados.clear();

        // opcional: publica no service, se você usa isso em outras áreas da tela
        const atual = this.saidaMaterialService.sMData.getValue();
        this.saidaMaterialService.setSaida({
          ...(atual ?? ({} as any)),
          saidaMaterial: { ...(atual?.saidaMaterial ?? {} as any), ...this.saidaMaterial }
        });

        this.cd.detectChanges();
        Swal.fire('Ok!', 'Separação finalizada. Material disponível para entrega.', 'success');
      },
      error: (error) => {
        console.error(error);
        Swal.close();
        Swal.fire('Erro!', error?.error?.message || 'Falha ao disponibilizar para entrega.', 'error');
      },
    });
  });
}

get algunsItensSeparados(): boolean {
  const total = this.itensControls?.length ?? 0;
  return this.itensSeparados.size > 0 && this.itensSeparados.size < total;
}

toggleSelecionarTodos(ev: Event): void {
  const checked = (ev.target as HTMLInputElement).checked;

  this.itensSeparados.clear();

  if (checked) {
    // marca todos
    for (let i = 0; i < this.itensControls.length; i++) {
      this.itensSeparados.add(i);
    }
  }
}

}
