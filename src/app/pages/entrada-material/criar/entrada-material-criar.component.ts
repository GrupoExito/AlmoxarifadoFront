import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { EMData } from '../_models/entrada-material-data.model';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';
import { BaseService } from '@pages/shared/services/base.service';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-entrada-material-criar',
  templateUrl: './entrada-material-criar.component.html',
  styleUrls: ['./entrada-material-criar.component.scss'],
})
export class EntradaMaterialCriarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private entradaMaterialService: EntradaMaterialService,
    private route: Router,
    private secretariaService: SecretariaFundoService,
    private fornecedorService: FornecedorService,
    private almoxarifadoService: AlmoxarifadoService,
    private pedidoCompraService: PedidoCompraService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService,
    private baseService: BaseService
  ) {}

  entradasMaterial: EntradaMaterial[];
  entradaMaterial: EntradaMaterial | null = null;
  criarEntradaMaterialForm: FormGroup;
  editarForm: any;
  token: AuthToken | null;
  secretarias: SecretariaFundo[];
  fornecedores: Fornecedor[];
  almoxarifados: Almoxarifado[];
  pedidoCompra: PedidoCompra[];
  usuario_id: number = 1;
  selectedAlmoxarifadoOrigem: number;
  selectedSecretariaOrigem: number;
  id: number | null;
  visualizarEntrada: EMData | null;
  entradaAlmoxarifadoUsuario: boolean | undefined = false;

  async ngOnInit(): Promise<void> {
  this.token = this.authService.getDecodedAccessToken();
  if (this.token) {
    this.usuario_id = this.token.id;
  }

  this.id = this.entradaMaterialService.getRouteId();

  this.criarEntradaMaterialForm = this.fb.group({
    nota: ['', [Validators.maxLength(10)]],
    fornecedor_id: ['', [Validators.required]],
    secretaria_fundo_id: ['', [Validators.required]],
    almoxarifado_id: ['', [Validators.required]],
    data_entrada: ['', [Validators.required]],
    pedido_despesa_id: [''],
    tipo_entrada: ['', [Validators.required]],
    conta_contabil: [''],
    data_nota: [''],
    saida_material_id: [''],
    observacao: ['', [Validators.maxLength(200)]],
  });

  await this.consultarConfiguracaoUsuario();

  if (this.id) {
    this.entradaMaterialService.data$.subscribe({
      next: (res) => {
        this.visualizarEntrada = res;

        if (!this.visualizarEntrada || !res?.entradaMaterial) return;

        // listas
        this.secretarias = this.visualizarEntrada.secretarias;
        this.fornecedores = this.visualizarEntrada.fornecedores;
        this.almoxarifados = this.visualizarEntrada.almoxarifados;

        // pedidos (normaliza id para number)
        this.pedidoCompra = this.visualizarEntrada.pedidoCompra.map((pedido: any) => ({
          ...pedido,
          id: Number(pedido.id),
          idAndObjeto: `${pedido.id} - ${pedido.objeto}`,
        }));

        // entrada
        this.entradaMaterial = res.entradaMaterial;

        // pega o pedidoId da entrada e normaliza para number (ou undefined)
        const pedidoId =
          this.entradaMaterial.pedido_despesa_id != null
            ? Number(this.entradaMaterial.pedido_despesa_id)
            : undefined;

        // patch geral SEM pedido (evita setar antes do ng-select casar)
        this.criarEntradaMaterialForm.patchValue({
          ...this.entradaMaterial,
          pedido_despesa_id: undefined,
        });

        // seta o pedido por último (força o ng-select a selecionar)
        this.criarEntradaMaterialForm.get('pedido_despesa_id')?.setValue(pedidoId);
        this.criarEntradaMaterialForm.get('pedido_despesa_id')?.updateValueAndValidity();

        // formatar datas (apenas para exibição/objeto local)
        this.entradaMaterial.data_nota = this.baseService.formatDate(this.entradaMaterial.data_nota);
        this.entradaMaterial.data_entrada = this.baseService.formatDate(this.entradaMaterial.data_entrada);

        // desabilita depois de setar tudo
        this.criarEntradaMaterialForm.disable();
      },
      error: (error) => console.log(error),
    });
  } else {
    this.carregarDropdownSecretaria();
    this.carregarDropdownFornecedor();
    this.carregarDropdownAlmoxarifado();
  }
}

  criar() {
    Swal.showLoading();
    const entradaMaterial: EntradaMaterial = {
      nota: this.criarEntradaMaterialForm.get('nota')!.value,
      status_id: 1,
      usuario_entrada_id: this.usuario_id,
      fornecedor_id: this.criarEntradaMaterialForm.get('fornecedor_id')!.value,
      secretaria_fundo_id: this.criarEntradaMaterialForm.get('secretaria_fundo_id')!.value,
      almoxarifado_id: this.criarEntradaMaterialForm.get('almoxarifado_id')!.value,
      data_entrada: this.criarEntradaMaterialForm.get('data_entrada')!.value,
      pedido_despesa_id: this.criarEntradaMaterialForm.get('pedido_despesa_id')!.value,
      tipo_entrada: this.criarEntradaMaterialForm.get('tipo_entrada')?.value,
      tipo_entrada_id: this.criarEntradaMaterialForm.get('tipo_entrada')?.value,
      conta_contabil: this.criarEntradaMaterialForm.get('conta_contabil')!.value,
      data_nota: this.criarEntradaMaterialForm.get('data_nota')!.value || null,
      saida_material_id: this.criarEntradaMaterialForm.get('saida_material_id')!.value || null,
      observacao: this.criarEntradaMaterialForm.get('observacao')!.value,
    };

    this.entradaMaterialService.criar(entradaMaterial).subscribe({
      next: (dto) => {
        Swal.fire('Criado!', 'Entrada Material criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/entradamaterial/view', dto.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  carregarDropdownSecretaria(): void {
    this.secretariaService.listarTodosPorUsuario().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
        console.log(secretarias);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarDropdownFornecedor(): void {
    this.fornecedorService.listarTodos().subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarDropdownAlmoxarifado(): void {
    if (this.entradaAlmoxarifadoUsuario) {
      this.almoxarifadoService.listarAlmoxarifadoUsuario().subscribe({
        next: (almoxarifados) => {
          this.almoxarifados = almoxarifados;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.almoxarifadoService.listarAtivos().subscribe({
        next: (almoxarifados) => {
          this.almoxarifados = almoxarifados;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onFornecedorChange(event: any) {
  const fornecedorId = event?.id ?? event;

  this.criarEntradaMaterialForm.get('pedido_despesa_id')?.setValue(null);

  // opcional: limpa a lista pra não ficar mostrando coisa velha
  this.pedidoCompra = [];

  if (!fornecedorId) return;

  this.carregarDropdownPedidoCompra(fornecedorId);
  }

  carregarDropdownPedidoCompra(fornecedor_id: number):void{
    this.pedidoCompraService.listarTodosComSaldo(fornecedor_id).subscribe({
      next: (pedidoCompra) => {
        this.pedidoCompra = pedidoCompra.map((pedido) => ({
          ...pedido,
          idAndObjeto: `${pedido.id} - ${pedido.objeto}`,
        }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onTipoEntradaChange() {
    console.log(this.criarEntradaMaterialForm.get('tipo_entrada')?.value);
    if (this.criarEntradaMaterialForm.get('tipo_entrada')?.value == 1) {
      this.criarEntradaMaterialForm.get('pedido_despesa_id')!.setValidators([Validators.required]);
      this.criarEntradaMaterialForm.get('pedido_despesa_id')!.updateValueAndValidity();
    } else {
      this.criarEntradaMaterialForm.controls.pedido_despesa_id.setValue(null);
      this.criarEntradaMaterialForm.get('pedido_despesa_id')!.clearValidators();
      this.criarEntradaMaterialForm.get('pedido_despesa_id')!.updateValueAndValidity();
    }
  }

confimarEntrada() {
  if (!this.id) return;

  Swal.showLoading();

  this.entradaMaterialService.consultarEntradaQuantidade(this.id).subscribe({
    next: (qtd) => {
      const totalItens = qtd?.quantidade_itens ?? 0;

      if (totalItens <= 0) {
        Swal.close();
        Swal.fire('Atenção', 'Adicione ao menos 1 item antes de confirmar.', 'info');
        return;
      }

      // pode confirmar
      this.entradaMaterialService.alterarStatusEntradaMaterial(this.id!, 2).subscribe({
        next: () => {
          this.entradaMaterial!.status_id = 2;
          this.atualizarEntradaMaterial();
          Swal.fire('Atualizado!', 'Entrada confirmada com sucesso!', 'success').then((result) => {
            //if (result.value) {
              //this.entradaMaterial.status_id=2;
              //this.route.navigate(['/entradamaterial/view', this.id, 'cadastro']);
            //}
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Erro!', error.error, 'error');
        },
      });
    },
    error: (error) => {
      console.log(error);
      Swal.fire('Erro!', 'Não foi possível validar a quantidade de itens.', 'error');
    },
  });
}


  reabrirEntrada() {
    Swal.showLoading();
    this.entradaMaterialService.alterarStatusEntradaMaterial(this.id!, 1).subscribe({
      next: () => {
        this.atualizarEntradaMaterial();
        Swal.fire('Reaberto!', 'Entrada reaberta com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/entradamaterial/view', this.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

cancelar() {
  if (!this.entradaMaterial) return;

  Swal.fire({
    title: 'Confirmar exclusão',
    text: 'Deseja realmente excluir esta Entrada de Material? Esta ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Não',
    confirmButtonColor: '#eb2067',
    cancelButtonColor: '#6c757d',
  }).then((result) => {
    if (!result.isConfirmed) return;

    Swal.showLoading();
    this.entradaMaterialService.deletar(this.entradaMaterial?.id!).subscribe({
      next: () => {
        Swal.close();
        //this.atualizarEntradaMaterial();
        Swal.fire(
                  'Excluído!',
                  'Entrada de Material foi cancelada!',
                  'success'
                ).then(() => {
                  this.route.navigate(['/entradamaterial/listar']);
                });
      },
      error: () => {
        Swal.close();
        Swal.fire('Algo deu errado!', 'Não foi possível excluir esta Entrada de Material!', 'error');
      },
    });
  });
}

  atualizarEntradaMaterial() {
    this.entradaMaterialService.consultarPorId(this.entradaMaterial?.id!).subscribe({
      next: (dto) => {
        this.entradaMaterialService.eMData.next({
          entradaMaterial: dto,
          secretarias: this.secretarias,
          fornecedores: this.fornecedores,
          almoxarifados: this.almoxarifados,
          pedidoCompra: this.pedidoCompra,
        });
      },
      error: () => {},
    });
  }

  async consultarConfiguracaoUsuario(): Promise<void> {
    const parameters = {
      nome_tela: 'entrada_almoxarifado',
    };

    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracaoUsuario) => {
          this.entradaAlmoxarifadoUsuario = configuracaoUsuario.find(
            (usuario) => usuario.nome_campo == 'entrada_almoxarifado_usuario'
          )?.valor_campo;
          resolve();
        },
        error: (error) => {
          console.log(error);
          reject(error);
        },
      });
    });
  }
}
