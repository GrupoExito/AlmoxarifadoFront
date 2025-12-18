import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoSecretaria } from '@pages/grupo-secretaria/_models/gruposecretaria.model';
import { GrupoSecretariaService } from '@pages/grupo-secretaria/_services/gruposecretaria.service';
import { Municipio } from '@pages/municipio/_models/municipio.model';
import { MunicipioService } from '@pages/municipio/_services/municipio.service';
import { Orgao } from '@pages/orgao/_models/orgao.model';
import { OrgaoService } from '@pages/orgao/_services/orgao.service';
import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { Usuario } from '@pages/pessoa/_models/usuario.model';
import { PessoaService } from '@pages/pessoa/_services/pessoa.service';
import { UsuarioService } from '@pages/usuario/_services/usuario.service';
import Swal from 'sweetalert2';
import { SecretariaFundo } from '../_models/secretaria-fundo.model';
import { SecretariaFundoService } from '../_services/secretaria-fundo.service';

@Component({
  selector: 'app-secretaria-fundo-editar',
  templateUrl: './secretaria-fundo-editar.component.html',
  styleUrls: ['./secretaria-fundo-editar.component.scss'],
})
export class SecretariaFundoEditarComponent implements OnInit {
  secretariaFundo: SecretariaFundo;
  editarSecretariaFundoForm: FormGroup;
  id: number;
  municipios: Municipio[];
  orgaos: Orgao[];
  secretariasFundos: SecretariaFundo[];
  grupoSecretarias: GrupoSecretaria[];
  fundo: boolean;
  usuarios: Usuario[];
  pessoas: Pessoa[];
  selectedPessoa: number[];
  selectedUsuarios: number[];

  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private orgaoService: OrgaoService,
    private secretariaFundoService: SecretariaFundoService,
    private grupoSecretariaService: GrupoSecretariaService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.municipioService.listarTodos().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.orgaoService.listarTodos().subscribe({
      next: (orgaos) => {
        this.orgaos = orgaos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretariasFundos) => {
        this.secretariasFundos = secretariasFundos;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.grupoSecretariaService.listarTodos().subscribe({
      next: (grupoSecretarias) => {
        this.grupoSecretarias = grupoSecretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.usuarioService.listarTodos().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.secretariaFundoService.consultarUsuariosPermitidos(this.id).subscribe({
          next: (res) => {
            this.selectedUsuarios = res.map((u) => u.usuario_id);
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.editarSecretariaFundoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      descricaoresumida: ['', [Validators.required, Validators.maxLength(50)]],
      sigla: ['', [Validators.required, Validators.maxLength(7)]],
      fundo: ['', Validators.required],
      cep: ['', Validators.maxLength(8)],
      logradouro: ['', Validators.maxLength(100)],
      complemento: ['', Validators.maxLength(20)],
      municipio_id: ['', Validators.required],
      bairro: ['', Validators.maxLength(30)],
      cnpj: ['', Validators.maxLength(18)],
      secretaria_fundo_id: [''],
      grupo_secretaria_id: ['', Validators.required],
      orgao_id: ['', Validators.required],
      codigo_tcm: [''],
      usuario_id: ['', Validators.required],
      gpessoa_responsavel_id: ['', Validators.required],
    });

    this.secretariaFundoService.consultarPorId(this.id).subscribe({
      next: (secretariaFundo) => {
        console.log(secretariaFundo);
        this.validarFundo(secretariaFundo.fundo);
        this.secretariaFundo = secretariaFundo;
        this.editarSecretariaFundoForm.patchValue(this.secretariaFundo);
        this.editarSecretariaFundoForm.get('fundo')?.setValue(secretariaFundo.fundo);
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.pessoaService.listarTodos().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
        this.secretariaFundoService.consultarSecretarioGestor(this.id).subscribe({
          next: (res) => {
            this.selectedPessoa = res.map((u) => u.pessoa_id);
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editar() {
    Swal.showLoading();
    const secretariaFundo: SecretariaFundo = {
      id: this.id,
      descricao: this.editarSecretariaFundoForm.get('descricao')!.value,
      descricaoresumida: this.editarSecretariaFundoForm.get('descricaoresumida')!.value,
      sigla: this.editarSecretariaFundoForm.get('sigla')!.value,
      fundo: !!+this.editarSecretariaFundoForm.get('fundo')!.value,
      cep: this.editarSecretariaFundoForm.get('cep')!.value,
      logradouro: this.editarSecretariaFundoForm.get('logradouro')!.value,
      complemento: this.editarSecretariaFundoForm.get('complemento')!.value,
      municipio_id: this.editarSecretariaFundoForm.get('municipio_id')!.value,
      bairro: this.editarSecretariaFundoForm.get('bairro')!.value,
      cnpj: this.editarSecretariaFundoForm.get('cnpj')!.value,
      grupo_secretaria_id: this.editarSecretariaFundoForm.get('grupo_secretaria_id')!.value,
      orgao_id: this.editarSecretariaFundoForm.get('orgao_id')!.value,
      codigo_tcm: this.editarSecretariaFundoForm.get('codigo_tcm')!.value,
      gpessoa_responsavel_id: this.editarSecretariaFundoForm.get('gpessoa_responsavel_id')!.value,
      usuario_id: this.editarSecretariaFundoForm.get('usuario_id')!.value,
    };
    if (this.fundo) {
      secretariaFundo.secretaria_fundo_id = this.editarSecretariaFundoForm.get('secretaria_fundo_id')!.value;
    }
    this.secretariaFundoService.editar(this.id, secretariaFundo).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Atualizado!', 'Secretaria/Fundo atualizado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/secretariafundo/editar', this.id]);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  validarFundo(ev: boolean) {
    this.fundo = ev;
    if (ev) {
      this.editarSecretariaFundoForm.get('secretaria_fundo_id')!.setValidators([Validators.required]);
      this.editarSecretariaFundoForm.get('secretaria_fundo_id')!.updateValueAndValidity();
    } else {
      this.editarSecretariaFundoForm.controls.secretaria_fundo_id.setValue('');
      this.editarSecretariaFundoForm.controls.cnpj.setValue('');
      this.editarSecretariaFundoForm.get('secretaria_fundo_id')!.clearValidators();
      this.editarSecretariaFundoForm.get('secretaria_fundo_id')!.updateValueAndValidity();
    }
  }
}
