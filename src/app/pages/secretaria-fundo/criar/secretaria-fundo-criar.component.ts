import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { BaseService } from '@pages/shared/services/base.service';

@Component({
  selector: 'app-secretaria-fundo-criar',
  templateUrl: './secretaria-fundo-criar.component.html',
  styleUrls: ['./secretaria-fundo-criar.component.scss'],
})
export class SecretariaFundoCriarComponent implements OnInit {
  secretariaFundo: SecretariaFundo;
  criarSecretariaFundoForm: FormGroup;
  municipios: Municipio[];
  orgaos: Orgao[];
  grupoSecretarias: GrupoSecretaria[];
  secretariasFundos: SecretariaFundo[];
  pessoas: Pessoa[];
  usuarios: Usuario[];
  selectedPessoa: number[];
  selectedUsuarios: number[];
  fundo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private secretariaFundoService: SecretariaFundoService,
    private route: Router,
    private municipioService: MunicipioService,
    private grupoSecretariaService: GrupoSecretariaService,
    private orgaoService: OrgaoService,
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.secretariaFundoService.listarTodosPorUsuario().subscribe({
      next: (secretariasFundos) => {
        this.secretariasFundos = secretariasFundos;
        console.log('por usuario', secretariasFundos);
      },
      error: (error) => {
        console.log(error);
      },
    });

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
    this.grupoSecretariaService.listarTodos().subscribe({
      next: (grupoSecretarias) => {
        this.grupoSecretarias = grupoSecretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.pessoaService.listarTodos().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.usuarioService.listarTodos().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarSecretariaFundoForm = this.fb.group({
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
      gpessoa_responsavel_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
    });
  }

  validarFundo(ev: boolean) {
    this.fundo = ev;
    if (ev) {
      this.criarSecretariaFundoForm.get('secretaria_fundo_id')!.setValidators([Validators.required]);
      this.criarSecretariaFundoForm.get('secretaria_fundo_id')!.updateValueAndValidity();
    } else {
      this.criarSecretariaFundoForm.controls.secretaria_fundo_id.setValue('');
      this.criarSecretariaFundoForm.controls.cnpj.setValue('');
      this.criarSecretariaFundoForm.get('secretaria_fundo_id')!.clearValidators();
      this.criarSecretariaFundoForm.get('secretaria_fundo_id')!.updateValueAndValidity();
    }
  }

  criar() {
    Swal.showLoading();
    const secretariaFundo: SecretariaFundo = {
      descricao: this.criarSecretariaFundoForm.get('descricao')!.value,
      descricaoresumida: this.criarSecretariaFundoForm.get('descricaoresumida')!.value,
      sigla: this.criarSecretariaFundoForm.get('sigla')!.value,
      fundo: !!+this.criarSecretariaFundoForm.get('fundo')!.value,
      cep: this.criarSecretariaFundoForm.get('cep')!.value,
      logradouro: this.criarSecretariaFundoForm.get('logradouro')!.value,
      complemento: this.criarSecretariaFundoForm.get('complemento')!.value,
      municipio_id: this.criarSecretariaFundoForm.get('municipio_id')!.value,
      bairro: this.criarSecretariaFundoForm.get('bairro')!.value,
      cnpj: this.criarSecretariaFundoForm.get('cnpj')!.value,
      grupo_secretaria_id: this.criarSecretariaFundoForm.get('grupo_secretaria_id')!.value,
      orgao_id: this.criarSecretariaFundoForm.get('orgao_id')!.value,
      codigo_tcm: this.criarSecretariaFundoForm.get('codigo_tcm')!.value,
      gpessoa_responsavel_id: this.criarSecretariaFundoForm.get('gpessoa_responsavel_id')!.value,
      usuario_id: this.criarSecretariaFundoForm.get('usuario_id')!.value,
    };

    if (this.fundo) {
      secretariaFundo.secretaria_fundo_id = this.criarSecretariaFundoForm.get('secretaria_fundo_id')!.value;
    }

    this.baseService.verificarNulosInterface(secretariaFundo);

    this.secretariaFundoService.criar(secretariaFundo).subscribe({
      next: (dto) => {
        Swal.close();
        Swal.fire('Criado!', 'Secretaria ou fundo criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/secretariafundo/editar', dto.id]);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }
}
