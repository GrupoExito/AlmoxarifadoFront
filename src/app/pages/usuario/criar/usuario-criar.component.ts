import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import Swal from 'sweetalert2';
import { GrupoUsuario } from '../_models/grupousuario.model';
import { SecretariaFundo } from '../_models/secretariafundo.model';
import { UsuarioSecretariaFundo } from '../_models/usuariosecretariafundo.model';
import { GrupoUsuarioService } from '../_services/grupousuario.service';
import { UsuarioService } from '../_services/usuario.service';
import { ClienteMunicipio } from 'src/app/modules/auth/models/cliente.model';
import { Usuario } from '../_models/usuario.model';

@Component({
  selector: 'app-usuario-criar',
  templateUrl: './usuario-criar.component.html',
  styleUrls: ['./usuario-criar.component.scss'],
})
export class UsuarioCriarComponent implements OnInit {
  usuario: Usuario;
  criarUsuarioForm: FormGroup;
  perfis: GrupoUsuario[];

  secretariasFundos: SecretariaFundo[];
  usuarioSecretariasFundos: UsuarioSecretariaFundo[];
  selectedSecretarias: number[];

  municipios: ClienteMunicipio[];
  selectedMunicipios: number[];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private usuarioService: UsuarioService,
    private grupoUsuarioService: GrupoUsuarioService,
    private secretariaFundoService: SecretariaFundoService
  ) {}

  ngOnInit(): void {
    this.grupoUsuarioService.listarTodosPorCliente().subscribe({
      next: (perfis) => {
        console.log(perfis);
        this.perfis = perfis;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretarias) => {
        console.log(secretarias);
        this.secretariasFundos = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.usuarioService.listarTodosMunicipios().subscribe({
      next: (municipio) => {
        this.municipios = municipio;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.criarUsuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      telefone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.maxLength(126), Validators.email]],
      perfil_id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      repetirSenha: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      dataLimiteAcesso: ['', [Validators.required]],
      secretarias: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.maxLength(126), Validators.minLength(5)]],
      municipios: [''],
    });
  }

  selecionarTodasSecretarias() {
    const secretarias = this.secretariasFundos.map((sec) => sec.id);
    this.criarUsuarioForm.get('secretarias')?.patchValue(secretarias);
  }

  salvar(dados: Usuario) {
    Swal.showLoading();
    this.usuarioService.criar(dados).subscribe({
      next: () => {
        Swal.close();
        Swal.fire('Criado!', 'Usuário criado com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/usuario']);
          }
        });
      },
      error: (error) => {
        const errorMessage = error.error?.message;
        Swal.fire('Atenção!', errorMessage, 'warning');
      },
    });
  }

  sugerirLogin() {
    const email = this.criarUsuarioForm.get('email')?.value;

    if (email && !this.criarUsuarioForm.get('login')?.touched) {
      this.criarUsuarioForm.get('login')?.setValue(email);
    }
  }

  removerEspacosDoLogin() {
    const loginControl = this.criarUsuarioForm.get('login');
    if (loginControl) {
      const valor = loginControl.value as string;
      const valorSemEspacos = valor ? valor.replace(/\s+/g, '') : '';
      loginControl.setValue(valorSemEspacos);
    }
  }
}
