import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import Swal from 'sweetalert2';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { Subscription } from 'rxjs';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';
import { SaidaMaterial } from '../_models/saida-material.model';
import { SolicitanteMaterial } from '@pages/solicitante-material/_models/solicitante-material.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { CentroCusto } from '@pages/centro-custo/_models/centro-custo.model';
import { SaidaMaterialService } from '../_services/saida-material.service';
import { UnidadeExterna } from '@pages/unidade-externa/_models/unidade-externa.model';
import { SMData } from '../_models/saida-material-data.model';
import { Cidadao } from '@pages/cidadao/_models/cidadao.model';
import { ConfiguracaoOrganizacaoService } from '@pages/configuracao-organizacao/_services/configuracao-organizacao.service';
import { AlmoxarifadoService } from '@pages/almoxarifado/_services/almoxarifado.service';
import { SolicitanteService } from '@pages/solicitante-material/_services/solicitante-material.service';
import { SetorService } from '@pages/setor/_services/setor.service';

@Component({
  selector: 'app-saida-material-editar',
  templateUrl: './saida-material-editar.component.html',
})
export class SaidaMaterialEditarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private saidaMaterialService: SaidaMaterialService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private configuracaoOrganizacaoService: ConfiguracaoOrganizacaoService,
    private almoxarifadoService: AlmoxarifadoService,
    private baseService: BaseService,
    private solicitanteService: SolicitanteService,
    private setorService: SetorService
  ) {}

  saidaMaterial: SaidaMaterial;
  editarMaterialSaidaForm: FormGroup;
  id: number | null;
  token: AuthToken | null;
  secretarias: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  solicitantes: SolicitanteMaterial[];
  unidadesExterna: UnidadeExterna[];
  setores: Setor[];
  centrosCusto: CentroCusto[];
  selectedSecretaria: number;
  selectedAlmoxarifado: number;
  selectedUnidadeExterna: number;
  selectedAlmoxarifadoDestino: number;
  selectedSecretariaDestino: number;
  selectedSolicitante: number;
  selectedSetor: number;
  selectedCentroCusto: number;
  subscription1: Subscription;
  visualizarSaida: SMData | null;
  tipoSaida: string;
  usuario_id: number = 1;
  cidadaos: Cidadao[];
  saidaAlmoxarifadoUsuario: boolean | undefined = true;
  saida_almoxarifado_solicitante_setor: boolean | undefined = false;

  async ngOnInit(): Promise<void> {
    console.log('Editar');
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.editarMaterialSaidaForm = this.fb.group({
      status_id: ['', []],
      secretaria_id: ['', []],
      almoxarifado_id: ['', []],
      solicitante_id: ['', []],
      setor_id: ['', []],
      observacao: ['', [Validators.maxLength(200)]],
      tipo_saida: ['', []],
      secretaria_destino_id: ['', []],
      almoxarifado_destino_id: ['', []],
      conta_contabil: ['', [Validators.maxLength(30)]],
      centro_custo_id: ['', []],
      data: ['', [Validators.required]],
      unidade_externa_id: ['', []],
      responsavel_retirada_id: ['', []],
      cidadao_id: ['', []],
    });

    await this.consultarConfiguracaoUsuario();

    this.saidaMaterialService.data$.subscribe({
      next: (res) => {
        this.saidaMaterial = res?.saidaMaterial!;
        this.secretarias = res?.secretarias!;
        this.almoxarifados = res?.almoxarifados!;
        this.solicitantes = res?.solicitantes!;
        this.setores = res?.setores!;
        this.centrosCusto = res?.centrosCusto!;
        this.unidadesExterna = res?.unidadesExterna!;
        this.saidaMaterial = res?.saidaMaterial!;
        //this.cidadaos = res?.cidadaos!;
        this.editarMaterialSaidaForm.patchValue(res?.saidaMaterial!);
        1;
        if (this.saidaAlmoxarifadoUsuario) {
          this.carregarAlmoxarifadosPorUsuario();
        } else {
          this.almoxarifados = res?.almoxarifados!;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.saidaMaterialService.consultarPorId(this.saidaMaterial.id!).subscribe({
      next: () => {
        this.editarMaterialSaidaForm.patchValue(this.saidaMaterial);
        this.editarMaterialSaidaForm.get('data')?.setValue(this.baseService.formatDate(this.saidaMaterial.data_solicitacao));

        if (this.saidaMaterialService.smDataEtapasHeader.getValue()!.quantidade_itens > 0) {
          this.editarMaterialSaidaForm.get('almoxarifado_id')?.disable();
          this.editarMaterialSaidaForm.get('secretaria_id')?.disable();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  carregarAlmoxarifadosPorUsuario(): void {
    this.almoxarifadoService.listarAlmoxarifadoUsuario().subscribe({
      next: (almoxarifados) => {
        this.almoxarifados = almoxarifados;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const saidaMaterial: SaidaMaterial = {
      id: this.saidaMaterial.id!,
      status_id: 1,
      almoxarifado_id: this.editarMaterialSaidaForm.get('almoxarifado_id')!.value,
      secretaria_id: this.editarMaterialSaidaForm.get('secretaria_id')!.value,
      setor_id: this.editarMaterialSaidaForm.get('setor_id')!.value,
      solicitante_id: this.editarMaterialSaidaForm.get('solicitante_id')!.value,
      centro_custo_id: this.editarMaterialSaidaForm.get('centro_custo_id')!.value,
      data_solicitacao: this.editarMaterialSaidaForm.get('data')!.value,
      usuario_id: this.usuario_id,
      observacao: this.editarMaterialSaidaForm.get('observacao')!.value,
      tipo_saida_id: this.editarMaterialSaidaForm.get('tipo_saida')!.value,
      secretaria_destino_id: this.editarMaterialSaidaForm.get('secretaria_destino_id')!.value,
      almoxarifado_destino_id: this.editarMaterialSaidaForm.get('almoxarifado_destino_id')!.value,
      conta_contabil: this.editarMaterialSaidaForm.get('conta_contabil')!.value,
      unidade_externa_id: this.editarMaterialSaidaForm.get('unidade_externa_id')!.value,
      responsavel_retirada_id: this.editarMaterialSaidaForm.get('responsavel_retirada_id')!.value,
      cidadao_id: this.editarMaterialSaidaForm.get('cidadao_id')!.value,
    };

    this.saidaMaterialService.editar(this.id!, saidaMaterial).subscribe({
      next: () => {
        const SMData: SMData = this.saidaMaterialService.sMData.getValue()!;
        SMData.saidaMaterial = saidaMaterial;
        this.saidaMaterialService.sMData.next(SMData);

        Swal.fire('Atualizado!', 'Saida Material atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/saidamaterial/view', saidaMaterial.id, 'cadastro']);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onTipoSaidaChange() {
    console.log(this.tipoSaida);
    if (this.tipoSaida == 'T') {
      this.editarMaterialSaidaForm.get('almoxarifado_destino_id')!.setValidators([Validators.required]);
      this.editarMaterialSaidaForm.get('almoxarifado_destino_id')!.updateValueAndValidity();
      this.editarMaterialSaidaForm.get('secretaria_destino_id')!.setValidators([Validators.required]);
      this.editarMaterialSaidaForm.get('secretaria_destino_id')!.updateValueAndValidity();
    } else {
      this.editarMaterialSaidaForm.controls.almoxarifado_destino_id.setValue(null);
      this.editarMaterialSaidaForm.get('almoxarifado_destino_id')!.clearValidators();
      this.editarMaterialSaidaForm.get('almoxarifado_destino_id')!.updateValueAndValidity();
      this.editarMaterialSaidaForm.controls.secretaria_destino_id.setValue(null);
      this.editarMaterialSaidaForm.get('secretaria_destino_id')!.clearValidators();
      this.editarMaterialSaidaForm.get('secretaria_destino_id')!.updateValueAndValidity();
      console.log(this.editarMaterialSaidaForm, 'else');
    }

    if (this.tipoSaida == 'x') {
      this.editarMaterialSaidaForm.get('unidade_externa_id')!.setValidators([Validators.required]);
      this.editarMaterialSaidaForm.get('unidade_externa_id')!.updateValueAndValidity();
    } else {
      this.editarMaterialSaidaForm.controls.unidade_externa_id.setValue(null);
      this.editarMaterialSaidaForm.get('unidade_externa_id')!.clearValidators();
      this.editarMaterialSaidaForm.get('unidade_externa_id')!.updateValueAndValidity();
    }
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

  carregarDropdownSetor(ng_item_selected: any): void {
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
}
