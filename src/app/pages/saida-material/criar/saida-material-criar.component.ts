import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { SaidaMaterial, SaidaMaterialTransferencia } from '../_models/saida-material.model';
import { SMData } from '../_models/saida-material-data.model';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { Setor } from '@pages/setor/_models/setor.model';
import { SolicitanteMaterial } from '@pages/solicitante-material/_models/solicitante-material.model';
import { CentroCusto } from '@pages/centro-custo/_models/centro-custo.model';
import { SolicitanteService } from '@pages/solicitante-material/_services/solicitante-material.service';
import { SetorService } from '@pages/setor/_services/setor.service';
import { CentroCustoService } from '@pages/centro-custo/_services/centro-custo.service';
import { UnidadeExterna } from '@pages/unidade-externa/_models/unidade-externa.model';
import { UnidadeExternaService } from '@pages/unidade-externa/_services/unidade-externa.service';
import { BaseService } from '@pages/shared/services/base.service';
import { CidadaoService } from '@pages/cidadao/_services/cidadao.service';
import { Cidadao } from '@pages/cidadao/_models/cidadao.model';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';

@Component({
  selector: 'app-saida-material-criar',
  templateUrl: './saida-material-criar.component.html',
  styleUrls: ['./saida-material-criar.component.scss'],
})
export class SaidaMaterialCriarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private saidaMaterialService: SaidaMaterialService,
    private route: Router,
    private secretariaService: SecretariaFundoService,
    private almoxarifadoService: AlmoxarifadoService,
    private solicitanteService: SolicitanteService,
    private setorService: SetorService,
    private centroCustoService: CentroCustoService,
    private unidadeExternaService: UnidadeExternaService,
    private baseService: BaseService,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService,
    //private cidadaoService: CidadaoService
  ) {}

  saidaMaterial: SaidaMaterial | null;
  criarSaidaMaterialForm: FormGroup;
  tipoSaida: number;
  token: AuthToken | null;
  secretarias: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  unidadesExterna: UnidadeExterna[];
  setores: Setor[];
  solicitantes: SolicitanteMaterial[];
  centroCustos: CentroCusto[];
  usuario_id: number = 1;
  id: number | null;
  visualizarSaida: SMData | null;
  //cidadaos: Cidadao[];
  saidaAlmoxarifadoUsuario: boolean | undefined = false;
  saida_almoxarifado_solicitante_setor: boolean | undefined = false;

  async ngOnInit(): Promise<void> {
    console.log('Cadastro');
    this.token = this.authService.getDecodedAccessToken();
    if (this.token) {
      this.usuario_id = this.token.id;
    }

    this.id = this.saidaMaterialService.getRouteId();
    this.criarSaidaMaterialForm = this.fb.group({
      solicitante_id: ['', [Validators.required]],
      secretaria_id: ['', [Validators.required]],
      almoxarifado_id: ['', [Validators.required]],
      setor_id: ['', [Validators.required]],
      data_solicitacao: ['', [Validators.required]],
      observacao: ['', [Validators.maxLength(200)]],
      tipo_saida_id: ['', [Validators.maxLength(1)]],
      secretaria_destino_id: ['', []],
      almoxarifado_destino_id: ['', []],
      unidade_externa_id: ['', []],
      centro_custo_id: ['', [Validators.required]],
      conta_contabil: ['', [Validators.maxLength(30)]],
      responsavel_retirada_id: ['', [Validators.required]],
      //cidadao_id: ['', []],
    });

    await this.consultarConfiguracaoUsuario();

    if (this.id) {
      this.saidaMaterialService.data$.subscribe({
        next: (res) => {
          this.visualizarSaida = res;
          if (this.visualizarSaida) {
            this.secretarias = this.visualizarSaida.secretarias;
            this.almoxarifados = this.visualizarSaida.almoxarifados;
            this.solicitantes = this.visualizarSaida.solicitantes;
            this.setores = this.visualizarSaida.setores;
            this.centroCustos = this.visualizarSaida.centrosCusto;
            this.tipoSaida = res?.saidaMaterial.tipo_saida_id!;
            this.saidaMaterial = res?.saidaMaterial!;
            this.unidadesExterna = this.visualizarSaida.unidadesExterna;
            this.criarSaidaMaterialForm.disable();
            this.criarSaidaMaterialForm.patchValue(res?.saidaMaterial!);
          }
        },
      });
    } else {
      this.carregarDropdownSecretaria();
      this.carregarDropdownSolicitante();
      this.carregarDropdownAlmoxarifado();
      this.carregarDropdownCentroCusto();
      this.carregarDropdownUnidadeExterna();
      //this.carregarDropdownCidadaos();
    }
  }

  criar() {
    Swal.showLoading();
    const saidaMaterial: SaidaMaterial = {
      status_id: 1,
      almoxarifado_id: this.criarSaidaMaterialForm.get('almoxarifado_id')!.value,
      solicitante_id: this.criarSaidaMaterialForm.get('solicitante_id')!.value,
      secretaria_id: this.criarSaidaMaterialForm.get('secretaria_id')!.value,
      setor_id: this.criarSaidaMaterialForm.get('setor_id')!.value,
      data_solicitacao: this.criarSaidaMaterialForm.get('data_solicitacao')!.value,
      usuario_id: this.usuario_id,
      observacao: this.criarSaidaMaterialForm.get('observacao')!.value,
      tipo_saida_id: this.criarSaidaMaterialForm.get('tipo_saida_id')!.value,
      almoxarifado_destino_id: this.criarSaidaMaterialForm.get('almoxarifado_destino_id')!.value,
      secretaria_destino_id: this.criarSaidaMaterialForm.get('secretaria_destino_id')!.value,
      centro_custo_id: this.criarSaidaMaterialForm.get('centro_custo_id')!.value,
      conta_contabil: this.criarSaidaMaterialForm.get('conta_contabil')!.value,
      unidade_externa_id: this.criarSaidaMaterialForm.get('unidade_externa_id')!.value,
      responsavel_retirada_id: this.criarSaidaMaterialForm.get('responsavel_retirada_id')!.value,
      //cidadao_id: this.criarSaidaMaterialForm.get('cidadao_id')!.value || null,
    };

    this.saidaMaterialService.criar(saidaMaterial).subscribe({
      next: (dto) => {
        Swal.fire('Criado!', 'Saida Material criada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/saidamaterial/view', dto.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
    console.log(this.saidaMaterial, 'enviar');
  }

  carregarDropdownSecretaria(): void {
    this.secretariaService.listarTodosPorUsuario().subscribe({
      next: (secretarias) => {
        this.secretarias = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarDropdownSetor(ng_item_selected: any): void {
    console.log('Carregar Setor', ng_item_selected);
    const id_secretaria = ng_item_selected.selectedValues[0].id;
    this.setorService.listarPorSecretaria(parseInt(id_secretaria)).subscribe({
      next: (setores) => {
        this.setores = setores;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarDropdownSolicitantePorSetor(setorSelecionado: any): void {
    const id_setor = setorSelecionado?.id;
    if (!id_setor) return;

    if (this.saida_almoxarifado_solicitante_setor) {
      this.solicitanteService.ListarSolicitantePorSetor(parseInt(id_setor)).subscribe({
        next: (solicitantes) => {
          this.solicitantes = solicitantes;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.solicitanteService.listarTodos().subscribe({
        next: (solicitantes) => {
          this.solicitantes = solicitantes;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  carregarDropdownUnidadeExterna(): void {
    this.unidadeExternaService.listarTodos().subscribe({
      next: (unidadesExterna) => {
        this.unidadesExterna = unidadesExterna;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
/*
  carregarDropdownCidadaos(): void {
    this.cidadaoService.listarTodos().subscribe({
      next: (cidadaos) => {
        this.cidadaos = cidadaos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
*/
  carregarDropdownSolicitante(): void {
    this.solicitanteService.listarTodos().subscribe({
      next: (solicitantes) => {
        this.solicitantes = solicitantes;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  carregarDropdownAlmoxarifado(): void {
    if (this.saidaAlmoxarifadoUsuario) {
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

  carregarDropdownCentroCusto(): void {
    this.centroCustoService.listarTodos().subscribe({
      next: (centroCustos) => {
        this.centroCustos = centroCustos;
        console.log(centroCustos);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onTipoSaidaChange() {
    const raw = this.criarSaidaMaterialForm.get('tipo_saida_id')?.value;
    this.tipoSaida = Number(raw); // garante number

    console.log('tipoSaida (number):', this.tipoSaida, 'raw:', raw, 'typeof raw:', typeof raw);

    if (this.tipoSaida === 2) {
      this.criarSaidaMaterialForm.get('almoxarifado_destino_id')!.setValidators([Validators.required]);
      this.criarSaidaMaterialForm.get('secretaria_destino_id')!.setValidators([Validators.required]);
    } else {
      this.criarSaidaMaterialForm.get('almoxarifado_destino_id')!.setValue(null);
      this.criarSaidaMaterialForm.get('secretaria_destino_id')!.setValue(null);
      this.criarSaidaMaterialForm.get('almoxarifado_destino_id')!.clearValidators();
      this.criarSaidaMaterialForm.get('secretaria_destino_id')!.clearValidators();
    }

    this.criarSaidaMaterialForm.get('almoxarifado_destino_id')!.updateValueAndValidity();
    this.criarSaidaMaterialForm.get('secretaria_destino_id')!.updateValueAndValidity();

    if (this.tipoSaida === 4) {
      this.criarSaidaMaterialForm.get('unidade_externa_id')!.setValidators([Validators.required]);
    } else {
      this.criarSaidaMaterialForm.get('unidade_externa_id')!.setValue(null);
      this.criarSaidaMaterialForm.get('unidade_externa_id')!.clearValidators();
    }
    this.criarSaidaMaterialForm.get('unidade_externa_id')!.updateValueAndValidity();
  }

  enviarSolicitacao(): void {
      Swal.fire({
        title: 'Tem certeza que deseja enviar?',
        text: 'Após envio você não será capaz de modificar esta solicitação!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#23b349',
        cancelButtonColor: '#eb2067',
      }).then((result) => {
        if (result.value) {
  
  this.saidaMaterialService.consultarSaidaQuantidade(this.id!).subscribe({
    next: (data) => {
      if (data.quantidade_itens > 0) {
          this.saidaMaterialService.enviarSolicitacao(this.id!).subscribe({
            next: () => {
              this.saidaMaterial!.status_id = 2;
              this.atualizarSaidaMaterial();

              Swal.fire('Enviado!', 'Solicitação da Saida Material foi enviada!', 'success');
            },
            error: () => {
              Swal.fire('Algo deu errado!', 'Não foi possivel enviar esta Saida de Material!', 'error');
            },
          });
        
      }else{
        Swal.fire('Atenção!', 'Não é possível enviar uma saída sem itens!', 'warning');
      }
    }
      });
  
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado!', 'A informação está segura!', 'error');
        }
      });
    }

  atualizarSaidaMaterial() {
    this.saidaMaterialService.consultarPorId(this.saidaMaterial?.id!).subscribe({
      next: (dto) => {
        this.saidaMaterialService.sMData.next({
          saidaMaterial: dto,
          secretarias: this.secretarias,
          solicitantes: this.solicitantes,
          almoxarifados: this.almoxarifados,
          centrosCusto: this.centroCustos,
          setores: this.setores,
          unidadesExterna: this.unidadesExterna,
          //cidadaos: this.cidadaos,
        });
      },
      error: () => {},
    });
  }

  async consultarConfiguracaoUsuario(): Promise<void> {
    const parameters = {
      nome_tela: 'saida_almoxarifado',
    };

    return new Promise((resolve, reject) => {
      this.configuracaoOrganizacaoService.ListarConfiguracao(parameters).subscribe({
        next: (configuracaoUsuario) => {
          this.saidaAlmoxarifadoUsuario = configuracaoUsuario.find(
            (usuario) => usuario.nome_campo == 'saida_almoxarifado_usuario'
          )?.valor_campo;
          this.saida_almoxarifado_solicitante_setor = configuracaoUsuario.find(
            (usuario) => usuario.nome_campo == 'saida_almoxarifado_solicitante_setor'
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
