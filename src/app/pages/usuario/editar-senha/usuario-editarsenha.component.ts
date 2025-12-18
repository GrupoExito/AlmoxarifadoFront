import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import Swal from 'sweetalert2';
import { GrupoUsuario } from '../_models/grupousuario.model';
import { SecretariaFundo } from '../_models/secretariafundo.model';
import { Usuario } from '../_models/usuario.model';
import { UsuarioSecretariaFundo } from '../_models/usuariosecretariafundo.model';
import { GrupoUsuarioService } from '../_services/grupousuario.service';
import { UsuarioService } from '../_services/usuario.service';
import { BaseService } from '@pages/shared/services/base.service';
import { AuthService } from 'src/app/modules/auth';
import { AuthToken } from 'src/app/modules/auth/models/auth.model';

@Component({
  selector: 'app-usuario-editarsenha',
  templateUrl: './usuario-editarsenha.component.html',
  styleUrls: ['./usuario-editarsenha.component.scss'],
})
export class UsuarioEditarSenhaComponent implements OnInit {
  id: number;
  usuario: Usuario = {};
  editarUsuarioForm: FormGroup;
  perfis: GrupoUsuario[];
  perfil: string;
  imgFile: any = '';
  file: File;

  secretariasFundos: SecretariaFundo[];
  usuarioSecretariasFundos: UsuarioSecretariaFundo[];

  selectedSecretarias: number[];
  token: AuthToken | null;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private usuarioService: UsuarioService,
    private grupoUsuarioService: GrupoUsuarioService,
    private secretariaFundoService: SecretariaFundoService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getDecodedAccessToken();

    this.id = this.token?.id!; //Number(this.routeActive.snapshot.paramMap.get('id'));

    this.editarUsuarioForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        repetirSenha: ['', [Validators.required]],
      },
      { validators: this.senhasIguaisValidator }
    );

    this.usuarioService.consultarPorId(this.id).subscribe({
      next: (x) => {
        this.usuario = x;
        this.editarUsuarioForm.patchValue(x);

        this.grupoUsuarioService.listarTodos().subscribe({
          next: (perfis) => {
            this.perfis = perfis;

            const perfilEncontrado = perfis.find((perfil) => perfil.id === x.perfil_id);

            if (perfilEncontrado) {
              // Definir o valor do campo nome na variável perfil
              this.perfil = perfilEncontrado.nome!;
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.secretariaFundoService.listarPorUsuario(this.id).subscribe({
      next: (x) => {
        this.selectedSecretarias = x.map((y) => y.id!);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.consultarAssinatura();
  }

  salvar(dados: Usuario) {
    Swal.showLoading();

    this.usuario.password = dados.password;

    this.usuarioService.editarSenha(this.id, this.usuario).subscribe({
      next: () => {
        Swal.fire('Editado!', 'Senha alterada com sucesso!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/usuario/editarsenha']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  consultarAssinatura() {
    this.usuarioService.consultarAssinaturaId().subscribe({
      next: (res) => {
        let reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            this.imgFile = reader.result;
          },
          false
        );

        if (res) {
          reader.readAsDataURL(res);
        }
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  salvarAssinatura() {
    Swal.showLoading();
    let formData = new FormData();
    formData.append('file', this.file);

    this.usuarioService.cadastrarAssinatura(formData).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Assinatura salva!', 'success').then((result) => {
          if (result.value) {
            this.route.navigate(['/usuario/editarsenha']);
          }
        });
      },
      error: (error) => {
        Swal.fire('Erro!', error.error.message, 'error');
      },
    });
  }

  mostrarImagem(event: any) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0]?.size > 3080173) {
        Swal.fire('Erro', 'Tamanho ultrapassa o valor de 3mbs', 'error');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.imgFile = reader.result;
        };
        this.imgFile = event.target.files[0];
        this.file = event.target.files[0];
        Swal.fire('Sucesso', 'Anexado com sucesso', 'success');
      }
    }
  }

  senhasIguaisValidator(control: AbstractControl) {
    const password = control.get('password')!.value;
    const repetirSenha = control.get('repetirSenha')!.value;

    return password === repetirSenha ? null : { senhasDiferentes: true };
  }
}
