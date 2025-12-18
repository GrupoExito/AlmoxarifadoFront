import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '@shared/services/base.service';
import { UsuarioService } from '@pages/usuario/_services/usuario.service';
import { Usuario } from '@pages/usuario/_models/usuario.model';
import Swal from 'sweetalert2';
import { AlmoxarifadoService } from '../_services/almoxarifado.service';
import { Almoxarifado } from '../_models/almoxarifado.model';
import { UsuarioAlmoxarifado } from '../_models/usuarioAlmoxarifado.model';

@Component({
  selector: 'app-almoxarifado-usuario',
  templateUrl: './almoxarifado-usuario.component.html',
})
export class AlmoxarifadoUsuarioComponent implements OnInit {
  almoxarifado: Almoxarifado;
  usuarios: Usuario[];
  usuariosAdicionados: UsuarioAlmoxarifado[] = [];
  selectedUsuarios: number[] = [];
  id: number;

  constructor(
    private fb: FormBuilder,
    private almoxarifadoService: AlmoxarifadoService,
    private routeActive: ActivatedRoute,
    private usuarioService: UsuarioService,
    private route: Router,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));

    this.carregarAlmoxarifado().then(() => {
      this.carregarUsuarios();
    });
  }
  
  async carregarAlmoxarifado(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.almoxarifadoService.consultarPorId(this.id).subscribe({
        next: (almoxarifado) => {
          this.almoxarifado = almoxarifado;
          resolve();
        },
        error: (error) => {
          Swal.fire('Erro', 'Não foi possível carregar o almoxarifado.', 'error');
          reject(error);
        },
      });
    });
  }
  
  carregarUsuarios(): void {
  this.almoxarifadoService.listarUsuariosAdicionados(this.id).subscribe({
    next: (usuariosAdicionados) => {
      this.usuariosAdicionados = usuariosAdicionados;

      this.usuarioService.listarTodos().subscribe({
        next: (todosUsuarios) => {
          // monta um mapa id → nome para ficar mais rápido de consultar
          const mapaUsuarios = new Map(
            todosUsuarios.map((u) => [u.id, u.nome])
          );

          // preenche o usuario_nome em cada usuário adicionado
          this.usuariosAdicionados = this.usuariosAdicionados.map((adicionado) => ({
            ...adicionado,
            usuario_nome: mapaUsuarios.get(adicionado.usuario_id) ?? adicionado.usuario_nome
          }));

          // (se ainda quiser manter a lista de usuários disponíveis pra adicionar)
          this.usuarios = todosUsuarios.filter(
            (user) => !usuariosAdicionados.some((adicionado) => adicionado.usuario_id === user.id)
          );
        },
        error: () => {
          Swal.fire('Erro', 'Não foi possível carregar os usuários.', 'error');
        },
      });
    },
    error: () => {
      Swal.fire('Erro', 'Não foi possível carregar os usuários adicionados.', 'error');
    },
  });
}


  adicionar(): void {
    if (!this.selectedUsuarios.length) {
      Swal.fire('Atenção', 'Selecione pelo menos um usuário para adicionar.', 'warning');
      return;
    }

    Swal.showLoading();
    this.almoxarifadoService.adicionarUsuarios(this.selectedUsuarios, this.id).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Usuários adicionados com sucesso!', 'success').then(() => {
          this.carregarUsuarios();
          this.selectedUsuarios = [];
        });
      },
      error: (error) => {
        Swal.fire('Erro', 'Não foi possível adicionar os usuários.', 'error');
      },
    });
  }

  deletar(usuario_id: number, almoxarifado_id: number): void {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja remover este usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.almoxarifadoService.deletarUsuario(usuario_id, almoxarifado_id).subscribe({
          next: () => {
            Swal.fire('Sucesso!', 'Usuário removido com sucesso!', 'success').then(() => {
              this.carregarUsuarios();
            });
          },
          error: (error) => {
            Swal.fire('Erro', 'Não foi possível remover o usuário.', 'error');
          },
        });
      }
    });
  }

  autorizador(usuario_id: number, almoxarifado_id: number, autorizador: boolean): void {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja alterar o status de autorizador deste usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, alterar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.almoxarifadoService.alterarAutorizadorUsuario(usuario_id, almoxarifado_id, autorizador).subscribe({
          next: () => {
            Swal.fire('Sucesso!', 'Status de autorizador alterado com sucesso!', 'success').then(() => {
              this.carregarUsuarios();
            });
          },
          error: (error) => {
            Swal.fire('Erro', 'Não foi possível alterar o status de autorizador do usuário.', 'error');
          },
        });
      }
    });
  }
}