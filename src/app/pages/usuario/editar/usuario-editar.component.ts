import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretariaFundoService } from '@pages/secretaria-fundo/_services/secretaria-fundo.service';
import Swal from 'sweetalert2';
import { GrupoUsuario } from '../_models/grupousuario.model';
import { SecretariaFundo } from '../_models/secretariafundo.model';
import { Usuario, VincularUsuarioClienteDTO } from '../_models/usuario.model';
import { UsuarioSecretariaFundo } from '../_models/usuariosecretariafundo.model';
import { GrupoUsuarioService } from '../_services/grupousuario.service';
import { UsuarioService } from '../_services/usuario.service';
import { BaseService } from '@pages/shared/services/base.service';
import { PermissionService } from 'src/app/modules/auth/services/permission.model';
import { Cliente, ClienteMunicipio } from 'src/app/modules/auth/models/cliente.model';
import { ClienteService } from '@pages/cliente/_services/cliente.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss'],
})
export class UsuarioEditarComponent implements OnInit {
  id: number;
  usuario: Usuario;
  editarUsuarioForm: FormGroup;
  perfis: GrupoUsuario[];

  secretariasFundos: SecretariaFundo[];
  usuarioSecretariasFundos: UsuarioSecretariaFundo[];
  selectedSecretarias: number[];
  cliente: ClienteMunicipio[];
  selectedMunicipios: number;
  selectedUsuarios: number;
  grupoUsuario: GrupoUsuario[];
  usuarios: Usuario[];
  gruposFiltrados: GrupoUsuario[] = [];
  todoGrupos: GrupoUsuario[];
  selectedGrupos: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private usuarioService: UsuarioService,
    private grupoUsuarioService: GrupoUsuarioService,
    private secretariaFundoService: SecretariaFundoService,
    private routeActive: ActivatedRoute,
    private baseService: BaseService,
    private permissionService: PermissionService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.grupoUsuarioService.listarTodosPorCliente().subscribe({
      next: (perfis) => {
        this.perfis = perfis;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.secretariaFundoService.listarTodos().subscribe({
      next: (secretarias) => {
        this.secretariasFundos = secretarias;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.grupoUsuarioService.listarTodosPorCliente().subscribe({
      next: (grupoUsuario) => {
        this.grupoUsuario = grupoUsuario;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.grupoUsuarioService.listarTodos().subscribe({
      next: (grupoUsuario) => {
        this.todoGrupos = grupoUsuario;
        console.log('Todos os grupos (geral):', grupoUsuario);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // Usuários
    this.usuarioService.listarTodos().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.log(error);
      },
    });

    // Clientes / Municípios
    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.cliente = clientes;
        console.log('Clientes:', this.cliente);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.editarUsuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      telefone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.maxLength(126), Validators.email]],
      perfil_id: ['', [Validators.required]],
      // password: ['', [Validators.maxLength(15), Validators.minLength(3)]],
      // repetirSenha: ['', [Validators.maxLength(15), Validators.minLength(3)]],
      dataLimiteAcesso: ['', [Validators.required]],
      secretarias: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.maxLength(126), Validators.minLength(5)]],
      municipios: [],
      grupoUsuarios: [],
      usuarios: [],
    });

    if (this.permissionService.validarPermissao('Usuário', 'alterar_senha_outro_usuario')) {
      this.editarUsuarioForm.addControl(
        'password',
        new FormControl([Validators.maxLength(15), Validators.minLength(3)])
      );
      this.editarUsuarioForm.addControl(
        'repetirSenha',
        new FormControl([Validators.maxLength(15), Validators.minLength(3)])
      );
    }

    this.usuarioService.consultarPorId(this.id).subscribe({
      next: (x) => {
        console.log(x);
        this.editarUsuarioForm.patchValue(x);
        this.editarUsuarioForm.get('password')?.setValue(null);
        this.editarUsuarioForm.get('repetirSenha')?.setValue(null);
        this.editarUsuarioForm.get('dataLimiteAcesso')?.setValue(this.baseService.formatDate(x.dataLimiteAcesso));
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
  }

  selecionarTodasSecretarias() {
    const secretarias = this.secretariasFundos.map((sec) => sec.id);
    this.editarUsuarioForm.get('secretarias')?.patchValue(secretarias);
  }

  salvar(dados: Usuario) {
    Swal.showLoading();

    if (dados.password != dados.repetirSenha) {
      Swal.fire('Erro!', 'Senhas não conferem!', 'error');
      return;
    }

    if (!dados.password) {
      delete dados.password;
      delete dados.repetirSenha;
    }

    this.usuarioService.editar(this.id, dados).subscribe({
      next: () => {
        Swal.fire('Editado!', 'Usuário salvo com sucesso!', 'success').then((result) => {
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

  filtrarGruposPorCliente(clienteId: number) {
    this.selectedGrupos = 0;
    this.editarUsuarioForm.get('grupoUsuarios')?.reset();

    if (!clienteId) {
      this.gruposFiltrados = [];
      return;
    }

    this.gruposFiltrados = this.todoGrupos.filter((g) => g.cliente_id === clienteId);

    console.log('Grupos filtrados:', this.gruposFiltrados);
  }

  vincular() {
    const usuarioId = this.editarUsuarioForm.get('usuarios')?.value;
    const municipioId = this.editarUsuarioForm.get('municipios')?.value;
    const grupoId = this.editarUsuarioForm.get('grupoUsuarios')?.value;

    if (!usuarioId || !municipioId || !grupoId) {
      Swal.fire('Atenção', 'Preencha todos os campos antes de vincular.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Confirmar vinculação?',
      text: 'Deseja realmente vincular este usuário ao município selecionado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, vincular',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();

        const dto: VincularUsuarioClienteDTO = {
          usuario_id: usuarioId,
          municipio_id: municipioId,
          grupousuario_id: grupoId,
        };

        this.usuarioService.vincularUsuarioCliente(dto).subscribe({
          next: (response) => {
            Swal.fire('Sucesso!', response.message || 'Usuário vinculado com sucesso.', 'success');
          },
          error: (error) => {
            const msg = error.error?.message || error.error?.error || 'Ocorreu um erro ao vincular o usuário.';
            Swal.fire('Erro!', msg, 'error');
            console.error('Erro ao vincular:', error);
          },
        });
      }
    });
  }
}
