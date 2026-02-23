import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { EntradaMaterial } from '../_models/entrada-material.model';
import { EntradaMaterialService } from '../_services/entrada-material.service';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { FornecedorService } from '@pages/fornecedor/_services/fornecedor.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';
import { Subscription, forkJoin } from 'rxjs';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { EMData } from '../_models/entrada-material-data.model';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-entrada-material-editar',
  templateUrl: './entrada-material-editar.component.html',
})
export class EntradaMaterialEditarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private entradaMaterialService: EntradaMaterialService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private baseService: BaseService,
    private secretariaService: SecretariaFundoService,
    private fornecedorService: FornecedorService,
    private pedidoService: PedidoCompraService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService,
    private almoxarifadoService: AlmoxarifadoService
  ) {}

  entradaMaterial: EntradaMaterial | null = null;
  editarMaterialEntradaForm: FormGroup;
  id: number | null;
  token: AuthToken | null;
  secretarias: SecretariaFundo[];
  fornecedores: Fornecedor[];
  almoxarifados: Almoxarifado[];
  pedidosCompra: PedidoCompra[];
  subscription1: Subscription;
  visualizarENTRADA: EMData | null;
  tipoEntrada: number;
  entradaAlmoxarifadoUsuario: boolean | undefined;

  async ngOnInit(): Promise<void> {
      console.log('Editar');

      const idHere = this.routeActive.snapshot.paramMap.get('id');
      const idParent = this.routeActive.parent?.snapshot.paramMap.get('id');
      const idStr = idHere ?? idParent;

      this.id = idStr ? Number(idStr) : null;

      if (!this.id) {
        console.error('ID não encontrado na URL.');
        return;
      }

      this.editarMaterialEntradaForm = this.fb.group({
      nota: ['', [Validators.maxLength(10)]],
      status_id: ['', []],
      fornecedor_id: ['', []],
      secretaria_fundo_id: ['', []],
      almoxarifado_id: ['', []],
      data_entrada: ['', [Validators.required]],
      pedido_despesa_id: ['', []],
      tipo_entrada: ['', []],
      secretaria_origem_id: ['', []],
      almoxarifado_origem_id: ['', []],
      data_nota: ['', []],
      saida_material_id: ['', []],
      observacao: ['', [Validators.maxLength(200)]],
    });

    
    //await this.consultarConfiguracaoUsuario();

this.entradaMaterialService.setRouteId(this.id);

this.entradaMaterialService.consultarPorId(this.id!).subscribe({
 next: (entradaMaterial) => {

this.entradaMaterial=entradaMaterial;
this.tipoEntrada = entradaMaterial.tipo_entrada!;

this.secretariaService.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
        this.fornecedorService.listarTodos().subscribe({
          next: (fornecedores) => {
            this.fornecedores = fornecedores;
            this.almoxarifadoService.listarAtivos().subscribe({
              next: (almoxarifados) => {
                this.almoxarifados = almoxarifados;
                
                this.pedidoService.listarTodosComSaldo(this.entradaMaterial?.fornecedor_id!).subscribe({
                  next: (pedidosCompra) => {
                    this.pedidosCompra = pedidosCompra;

                    const entradaQuantidade = this.entradaMaterialService.consultarEntradaQuantidade(this.id!);

                        this.editarMaterialEntradaForm.patchValue(entradaMaterial);
                        this.editarMaterialEntradaForm.get('data_entrada')?.setValue(this.baseService.formatDate(entradaMaterial.data_entrada));
                        this.editarMaterialEntradaForm.get('data_nota')?.setValue(this.baseService.formatDate(entradaMaterial.data_nota));
                        this.editarMaterialEntradaForm.get('tipo_entrada')?.disable();
                        this.editarMaterialEntradaForm.get('pedido_despesa_id')?.disable();
                        this.editarMaterialEntradaForm.get('saida_material_id')?.disable();
                        this.editarMaterialEntradaForm.get('almoxarifado_id')?.disable();
                        this.atualizarRegraFornecedor();
                        //this.selectedPedidoCompra = entradaMaterial.pedido_despesa_id!;
                        this.editarMaterialEntradaForm.get('pedido_despesa_id')?.setValue(entradaMaterial.pedido_despesa_id);
                      
                  },
                });
              },
            });
          },
        });
      },
    });

    },
      error: (error) => {
        console.error(error);
      },
    });

      
  }

  editar() {
    Swal.showLoading();
    const entradaMaterial: EntradaMaterial = {
      id: this.entradaMaterial?.id!,
      nota: this.editarMaterialEntradaForm.get('nota')!.value,
      status_id: this.editarMaterialEntradaForm.get('status_id')!.value,
      fornecedor_id: this.editarMaterialEntradaForm.get('fornecedor_id')!.value,
      secretaria_fundo_id: this.editarMaterialEntradaForm.get('secretaria_fundo_id')!.value,
      almoxarifado_id: this.editarMaterialEntradaForm.get('almoxarifado_id')!.value,
      data_entrada: this.editarMaterialEntradaForm.get('data_entrada')!.value,
      pedido_despesa_id: this.editarMaterialEntradaForm.get('pedido_despesa_id')!.value,
      tipo_entrada: this.editarMaterialEntradaForm.get('tipo_entrada')!.value,
      tipo_entrada_id: this.editarMaterialEntradaForm.get('tipo_entrada')!.value,
      secretaria_origem_id: this.editarMaterialEntradaForm.get('secretaria_origem_id')!.value,
      almoxarifado_origem_id: this.editarMaterialEntradaForm.get('almoxarifado_origem_id')!.value,
      data_nota: this.editarMaterialEntradaForm.get('data_nota')!.value || null,
      saida_material_id: this.editarMaterialEntradaForm.get('saida_material_id')!.value,
      observacao: this.editarMaterialEntradaForm.get('observacao')!.value,
    };

    this.entradaMaterialService.editar(this.id!, entradaMaterial).subscribe({
      next: () => {
        const EMData: EMData = this.entradaMaterialService.eMData.getValue()!;
        EMData.entradaMaterial = entradaMaterial;
        this.entradaMaterialService.eMData.next(EMData);
        Swal.close();
        Swal.fire('Atualizado!', 'Entrada Material atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/entradamaterial/view', entradaMaterial.id, 'cadastro']);
          }
        });
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

  onTipoEntradaChange() {
    console.log(this.tipoEntrada);
    if (this.tipoEntrada == 1) {
      this.editarMaterialEntradaForm.get('pedido_despesa_id')!.setValidators([Validators.required]);
      this.editarMaterialEntradaForm.get('pedido_despesa_id')!.updateValueAndValidity();
    } else {
      this.editarMaterialEntradaForm.controls.pedido_despesa_id.setValue(null);
      this.editarMaterialEntradaForm.controls.almoxarifado_origem_id.setValue(null);
      this.editarMaterialEntradaForm.controls.secretaria_origem_id.setValue(null);
      this.editarMaterialEntradaForm.get('pedido_despesa_id')!.clearValidators();
      this.editarMaterialEntradaForm.get('pedido_despesa_id')!.updateValueAndValidity();
    }
  }

  private atualizarRegraFornecedor(): void {
    const tipo = Number(this.editarMaterialEntradaForm.get('tipo_entrada')?.value);
    const fornecedorCtrl = this.editarMaterialEntradaForm.get('fornecedor_id');

    if (!fornecedorCtrl) return;

    if (tipo === 1) {
      fornecedorCtrl.disable({ emitEvent: false });  // bloqueia alteração
    } else {
      fornecedorCtrl.enable({ emitEvent: false });   // libera alteração
    }
  }
}
