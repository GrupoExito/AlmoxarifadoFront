import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoServico } from '@pages/produto-servico/_models/produto-servico.model';
import { ProdutoServicoService } from '@pages/produto-servico/_services/produto-servico.service';
import { dtOptions } from '@pages/shared/globals';
import { DataTableDirective } from 'angular-datatables';
import { Subject, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { EntradaMaterialItemService } from '../_services/entrada-material-itens.service';
import { BaseService } from '@pages/shared/services/base.service';
import { Modal } from 'bootstrap';
import { EntradaMaterialItem } from '../_models/entrada-material-itens.model';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { EntradaMaterialItemLegacyService } from '../_services/entrada-material-itens-legacy.service';

@Component({
  selector: 'app-entrada-material-itens',
  templateUrl: './entrada-material-itens.component.html',
  styleUrls: ['../entrada-material.component.scss'],
})
export class EntradaMaterialItemComponent implements OnInit {
  constructor(
    private produtoServicoService: ProdutoServicoService,
    private entradaMaterialService: EntradaMaterialService,
    private entradaMaterialItemService: EntradaMaterialItemService,
    private entradaMaterialItemLegacyService: EntradaMaterialItemLegacyService,
    private baseService: BaseService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild('quantidadeMaterial') quantidadeMaterial!: ElementRef;
  @ViewChild('xmlInput') xmlInput!: ElementRef<HTMLInputElement>;

  modalXmlNotaFiscal: any;

  xmlFile: File | null = null;
  xmlFileName: string = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  produtosServico: ProdutoServico[];
  produtoServico: ProdutoServico;
  selectedProdutoServico: number;
  addProdutoSDForm: FormGroup;
  entradaItens: EntradaMaterialItem[];
  entradaMaterial: EntradaMaterial;
  dtTrigger = new Subject<any>();
  dtOptions: any;
  entrada_id: number;
  apostilamento: boolean;
  sd_origem_id: number;
  permissaoStatus: number[];
  modalAdicionarItem: any;
  item: ProdutoServico;
  quantidadeSolicitadaSelecionada: any;
  quantidadeEntradaSelecionada: any;
  valorSelecionado: any;
  saldo: any;
  usaLoteeValidade: boolean = true;
  codigoBarra: string = '';
  permite_fracionamento: boolean = false;
  siglaUnidadeMedidaFracionamento: string = '';

  pedido_compra_id: number;

  nota: string = '';
  data_nota: Date | null = null;
  fornecedor_id: number | null = null;

  unidade_medida_original_id: number;

  ngOnInit(): void {
    console.log('Itens');

    this.modalAdicionarItem = new Modal(document.getElementById('modalAdicionarItem')!);
    this.modalXmlNotaFiscal = new Modal(document.getElementById('modalXmlNotaFiscal')!);

    this.dtOptions = dtOptions;
    this.entrada_id = this.entradaMaterialService.getRouteId()!;
    this.dtOptions = dtOptions;
    this.addProdutoSDForm = this.fb.group({
      quantidade: ['', [Validators.required]],
      produto_servico_id: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data_validade: ['', []],
      numero_lote: ['', []],
    });

    this.listarProdutosAdicionados();

    this.entradaMaterialService.consultarPorId(this.entrada_id!).subscribe({
      next: (res) => {
        this.entradaMaterial = res;

        if (this.entradaMaterial.tipo_entrada === 2 || this.entradaMaterial.tipo_entrada === 4) {// 2= Transferencia e 4= devolução
          this.listarProdutoSaidas(this.entradaMaterial.saida_material_id!);
        } else if (this.entradaMaterial.tipo_entrada === 1) {
          this.pedido_compra_id=this.entradaMaterial.pedido_despesa_id!;
          this.ListarPedidoCompraItens(this.entradaMaterial.pedido_despesa_id!);
        } else {
          this.listarProdutos();
        }

        this.nota = this.entradaMaterial.nota;
        this.data_nota = this.entradaMaterial.data_nota
          ? new Date(this.entradaMaterial.data_nota)
          : null;
        this.fornecedor_id = this.entradaMaterial.fornecedor_id || null;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  adicionar(): void {
    const quantidade = this.addProdutoSDForm.get('quantidade')!.value;
    const valor = this.addProdutoSDForm.get('valor')!.value;
    const dataValidadeString = this.addProdutoSDForm.get('data_validade')!.value;
    const numeroLote = this.addProdutoSDForm.get('numero_lote')!.value;

    if (quantidade === 0 || valor === 0) {
      Swal.fire('Erro!', 'A quantidade e o valor não podem ser 0.', 'error');
      return;
    }

    if (this.entradaMaterial.tipo_entrada === 1) {
      if (quantidade > this.saldo) {
        Swal.fire('Erro!', 'A quantidade não pode ser superior ao saldo disponível', 'error');
        return;
      }
    }

    if (this.usaLoteeValidade) {
      if (!dataValidadeString && this.produtoServico && this.produtoServico.usadataValidade) {
        Swal.fire(
          'Erro!',
          'Esse item está configurado para movimentações com data de validade, é necessário preencher o campo data de validade.',
          'error'
        );
        return;
      }
      if (!numeroLote && this.produtoServico && this.produtoServico.usalotefabricacao) {
        Swal.fire(
          'Erro!',
          'Esse item está configurado para movimentações com lote, é necessário preencher o campo lote.',
          'error'
        );
        return;
      }
      const data = new Date();
      const dataFormatada = new Date(data);
      const partesDataValidade = dataValidadeString.split('-');
      const anoValidade = parseInt(partesDataValidade[0], 10);
      const mesValidade = parseInt(partesDataValidade[1], 10) - 1;
      const diaValidade = parseInt(partesDataValidade[2], 10);
      const dataValidadeDate = new Date(anoValidade, mesValidade, diaValidade);
      dataValidadeDate.setHours(data.getHours(), data.getMinutes(), data.getSeconds(), data.getMilliseconds());

      if (dataValidadeString.trim() !== '' && dataValidadeDate <= dataFormatada) {
        Swal.fire('Erro!', 'A data de validade não pode ser igual ou menor que a data atual', 'error');
        return;
      }
    }

    Swal.showLoading();
    const entradaMaterialItens: EntradaMaterialItem = {
      quantidade: quantidade,
      valor_unitario: valor || null,
      valor_total: quantidade * valor,
      produto_servico_id: this.addProdutoSDForm.get('produto_servico_id')!.value,
      data_validade: dataValidadeString.trim(),
      lote: this.addProdutoSDForm.get('numero_lote')!.value,
      entrada_id: this.entradaMaterialService.getRouteId()!,
      nota: this.nota,
      data_nota: this.data_nota ? this.data_nota.toISOString().split('T')[0] : undefined,
      fornecedor_id: this.fornecedor_id!,
    };

    this.baseService.verificarNulosInterface(entradaMaterialItens);

    this.entradaMaterialItemService.criar(entradaMaterialItens).subscribe({
      next: () => {
        this.entradaMaterialService.consultarPorId(this.entrada_id!).subscribe({
          next: (entradaMaterial) => {
            this.entradaMaterial = entradaMaterial;
            if (entradaMaterial.tipo_entrada === 4 || entradaMaterial.tipo_entrada === 2) {// 2= Transferencia e 4= devolução
              this.listarProdutoSaidas(entradaMaterial.saida_material_id!);
            } else if (entradaMaterial.tipo_entrada === 1) {
              this.ListarPedidoCompraItens(entradaMaterial.pedido_despesa_id!);
            } else {
              this.listarProdutos();
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
        
        this.listarProdutosAdicionados();

        Swal.fire('Adicionado!', 'Produto adicionado com sucesso!', 'success');
        this.addProdutoSDForm.reset();
        this.addProdutoSDForm.get('data_validade')?.setValue('');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public trackItem(index: number, item: EntradaMaterialItem) {
    return item.id;
  }

  rerender(): void {
    // se o DataTable ainda não foi inicializado, apenas dispara o trigger
    if (!this.dtElement || !this.dtElement.dtInstance) {
      this.dtTrigger.next(null);
      return;
    }

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  listarProdutos() {
      this.produtoServicoService.listarItensAlmoxarifado().subscribe({
        next: (produtosServico) => {
          this.produtosServico = this.normalizeProdutosServico(produtosServico);;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  listarProdutoSaidas(saida_material_id: number) {
    this.entradaMaterialItemService.listarItensSaidas(saida_material_id).subscribe({
      next: (produtosServico) => {
        this.produtosServico = produtosServico;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ListarPedidoCompraItens(pedido_despesa_id: number) {
    this.entradaMaterialItemLegacyService.ListarPedidoCompraItens(pedido_despesa_id).subscribe({
      next: (produtosServico) => {
        this.produtosServico = produtosServico;
        console.log(produtosServico, 'produtosServico entrada por pedido itens');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selecionarItem(item: ProdutoServico) {

    console.log(item, 'item selecionado');
    this.produtoServico = item;

    if(this.entradaMaterial.tipo_entrada === 1){// entrada por pedido de compra
      this.quantidadeSolicitadaSelecionada = item.quantidade_pedido;
      this.saldo = item.saldo_pedido;
      this.valorSelecionado = item.valor_unitario;
      this.addProdutoSDForm.get('valor')?.setValue(item.valor_unitario);
      this.addProdutoSDForm.get('quantidade')?.setValue(item.saldo_pedido);
      this.unidade_medida_original_id= item.unidade_medida_id;
    }
    else{
      this.quantidadeSolicitadaSelecionada = 9999999999;
      this.saldo = 9999999999;
      this.valorSelecionado = item.valor_referencia;
      this.addProdutoSDForm.get('valor')?.setValue(item.valor_referencia);
      this.addProdutoSDForm.get('quantidade')?.setValue(0);
      this.unidade_medida_original_id= item.unidade_medida_id;
    }
  }

  private ensureFracionamentoControl() {
  if (!this.addProdutoSDForm.contains('qtde_do_principal')) {
    this.addProdutoSDForm.addControl('qtde_do_principal', this.fb.control('', Validators.required));
  }
}

private removeFracionamentoControl() {
  if (this.addProdutoSDForm.contains('qtde_do_principal')) {
    this.addProdutoSDForm.removeControl('qtde_do_principal');
  }
}

listarProdutosAdicionados() {
  this.entradaMaterialItemService
    .listarItemPorEntrada(this.entradaMaterialService.getRouteId()!)
    .subscribe({
      next: (entradaItens) => {
        this.entradaItens = entradaItens ?? [];

        const headerAtual = this.entradaMaterialService.emDataEtapasHeader.getValue();
        if (headerAtual) {
          const valorTotal = this.entradaItens.reduce((acc, item) => {
            return acc + (item.quantidade ?? 0) * (item.valor_unitario ?? 0);
          }, 0);

          this.entradaMaterialService.emDataEtapasHeader.next({
            ...headerAtual,
            quantidade_itens: this.entradaItens.length,
            valorTotal,
          });

          //this.cd.detectChanges();
        }

        this.rerender();
      },
      error: (error) => console.log(error),
    });
}

  deletar(id: number = 0): void {
    console.log('deletar item', id);
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
        this.entradaMaterialItemService.deletar(id).subscribe({
          next: () => {
            this.entradaMaterialService.consultarPorId(this.entrada_id!).subscribe({
              next: (entradaMaterial) => {
                this.entradaMaterial = entradaMaterial;
                this.listarProdutosAdicionados();
                  this.addProdutoSDForm.reset();
                  Swal.fire('Excluído!', 'Item excluído!', 'success');
                /*if (entradaMaterial.tipo_entrada === 4) {
                  this.listarProdutoSaidas(entradaMaterial.saida_material_id!);
                } else if (entradaMaterial.tipo_entrada === 1) {
                  this.ListarPedidoCompraItens(entradaMaterial.pedido_despesa_id!);
                } else {
                  this.listarProdutos();
                }*/
              },
              error: (error) => {
                console.log(error);
              },
            });
/*
            this.entradaItens = this.entradaItens.filter((entrada) => entrada.id != id);
            let header = this.entradaMaterialService.emDataEtapasHeader.getValue();
            header!.quantidade_itens = this.entradaItens.length;
            if (this.entradaItens) {
              header!.valorTotal = this.entradaItens.reduce((accumulator, object) => {
                return accumulator + object.valor_unitario! * object.quantidade!;
              }, 0);
            } else {
              header!.valorTotal = 0;
            }
            this.entradaMaterialService.emDataEtapasHeader.next(header);
            this.rerender();
            this.addProdutoSDForm.reset();

            Swal.fire('Excluído!', 'Item excluído!', 'success');
            */
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

adicionarTodosItensPorPedidoCompra() {
  Swal.fire({
    title: 'Confirmação',
    text: 'Deseja adicionar todos os itens do pedido de compra?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, adicionar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
  }).then((result) => {
    if (!result.isConfirmed) return;

    Swal.showLoading();
    this.entradaMaterialItemService
      .adicionarTodosItensPorPedidoCompra(this.pedido_compra_id, this.entrada_id)
      .subscribe({
        next: () => {
          Swal.fire('Ok!', 'Itens adicionados com sucesso!', 'success');
          // melhor que reload total:
          this.listarProdutosAdicionados();
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Erro!', 'Não foi possível adicionar os itens.', 'error');
        },
      });
  });
}

  adicionarTodosItensPorNF() {
    this.entradaMaterialItemService.adicionarTodosItensPorPedidoCompra(this.pedido_compra_id, this.entrada_id).subscribe({
      next: () => {
        document.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

async atualizarQuantidade(
  id: number = 0,
  produto_servico_id: number = 0,
  quantidadeAtual: number = 0
) {
  const max = (this.entradaMaterial?.tipo_entrada === 1 && this.saldo != null)
    ? Number(this.saldo)
    : null;

  const result = await Swal.fire({
    title: 'Digite a nova quantidade',
    html: `<div style="text-align:left">
    <div>Quantidade atual: <b>${quantidadeAtual}</b></div>
    ${max !== null ? `<div>Saldo disponível: <b>${max}</b></div>` : ''}
    </div>`,
    input: 'number',
    inputValue: quantidadeAtual ?? 1,      //já vem preenchido
    inputAttributes: {
      min: '1',                            //UX: já impede < 1 em muitos browsers
      step: '1',
    },
    showCancelButton: true,
    confirmButtonText: 'Atualizar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: async (value) => {
      const quantidade = Number(value);

      if (!Number.isFinite(quantidade)) {
        Swal.showValidationMessage('Digite um número válido.');
        return;
      }

      if (quantidade < 1) {                // ✅ regra: não aceitar < 1
        Swal.showValidationMessage('A quantidade deve ser no mínimo 1.');
        return;
      }

      if (max !== null && quantidade > max) {
        Swal.showValidationMessage(`A quantidade não pode ser superior ao saldo disponível (${max}).`);
        return;
      }

      const payload = {
        id,
        quantidade,
        entrada_id: this.entrada_id,
        produto_servico_id,
      };

      //O segredo: retornar a promise do request pro Swal esperar
      try {
        await firstValueFrom(this.entradaMaterialItemService.atualizarQuantidadeitem(payload));
        return true;
      } catch (e: any) {
        Swal.showValidationMessage(
          e?.error?.message ?? 'Não foi possível atualizar a quantidade.'
        );
        return;
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

  if (result.isConfirmed) {
    await this.listarProdutosAdicionados(); // ✅ recarrega lista
    Swal.fire('Atualizado!', 'Item atualizado com sucesso!', 'success');
  }
}


  onEnterPressed() {
    Swal.showLoading();
    this.produtoServicoService.consultarPorCodigoBarra(this.codigoBarra).subscribe({
      next: (item) => {
        Swal.close();
        if (item) {
          this.codigoBarra = '';
          this.selectedProdutoServico = item.id!;
          setTimeout(() => {
            this.quantidadeMaterial.nativeElement.focus();
          }, 500);
        } else {
          Swal.fire('Erro!', 'Item não encontrado', 'error');
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', 'Algo deu errado ao procurar pelo código de barrar', 'error');
      },
    });
  }

  private normalizeProdutosServico(produtos: any[]): ProdutoServico[] {
  return produtos.map(p => ({
    ...p,
    // se já tiver produto_servico_id, mantém
    // senão, usa o id como produto_servico_id
    produto_servico_id: p.produto_servico_id ?? p.id,
      quantidade_pedido: p.quantidade_pedido ?? 9999999999,
      saldo_pedido: p.saldo_pedido ?? 9999999999,
      valor_unitario: p.valor_unitario ?? p.valor_referencia,
  }));
}

abrirModalNotaFiscal() {
  this.xmlFile = null;
  this.xmlFileName = '';

  // limpa o input pra permitir re-selecionar o mesmo arquivo
  if (this.xmlInput?.nativeElement) {
    this.xmlInput.nativeElement.value = '';
  }

  this.modalXmlNotaFiscal.show();
}

onXmlSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;

  if (!file) {
    this.xmlFile = null;
    this.xmlFileName = '';
    return;
  }

  // validação simples
  const isXml =
    file.name.toLowerCase().endsWith('.xml') ||
    file.type.includes('xml');

  if (!isXml) {
    Swal.fire('Arquivo inválido', 'Selecione um arquivo .xml', 'warning');
    input.value = '';
    this.xmlFile = null;
    this.xmlFileName = '';
    return;
  }

  this.xmlFile = file;
  this.xmlFileName = file.name;
}

enviarXmlNotaFiscal() {
  if (!this.xmlFile) return;

  Swal.fire({
    title: 'Confirmação',
    text: 'Deseja enviar este XML e adicionar os itens da nota fiscal?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, enviar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#23b349',
    cancelButtonColor: '#eb2067',
  }).then((result) => {
    if (!result.isConfirmed) return;

    Swal.showLoading();
    this.entradaMaterialItemService
      .adicionarItensPorNotaFiscal(this.pedido_compra_id, this.entrada_id, this.xmlFile!)
      .subscribe({
        next: () => {
          this.modalXmlNotaFiscal.hide();
          Swal.fire('Ok!', 'Itens adicionados pela nota fiscal!', 'success');
          this.listarProdutosAdicionados();
        },
        error: (error) => {
          console.log(error);
          this.tratarErroApi(error);
        },
      });
    });
  }

  private tratarErroApi(error: any) {
    let mensagem = 'Ocorreu um erro inesperado.';

    // string simples
    if (typeof error?.error === 'string') {
      mensagem = error.error;
    }

    // objeto estruturado
    else if (typeof error?.error === 'object') {
      if (error.error.mensagem) {
        mensagem = error.error.mensagem;

        // se vier lista de códigos de barra
        if (
          Array.isArray(error.error.codigos_barra_nao_localizados) &&
          error.error.codigos_barra_nao_localizados.length > 0
        ) {
          mensagem +=
            '\n\nCódigos de barra não localizados:\n' +
            error.error.codigos_barra_nao_localizados.join(', ');
        }
      }
    }

    // fallback por status
    else if (error.status === 404) {
      mensagem = 'Registro não encontrado.';
    }

    Swal.fire({
      title: 'Erro',
      text: mensagem,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

}
