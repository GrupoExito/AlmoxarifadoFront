import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCriarComponent } from './criar/usuario-criar.component';
import { UsuarioEditarSenhaComponent } from './editar-senha/usuario-editarsenha.component';
import { UsuarioEditarComponent } from './editar/usuario-editar.component';
import { UsuarioListarComponent } from './listar/usuario-listar.component';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Usuário', acao: 'acessar_usuario' } },
        component: UsuarioListarComponent,
      },
      {
        path: 'criar',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Usuário', acao: 'novo_usuario' } },
        component: UsuarioCriarComponent,
      },
      {
        path: 'editar/:id',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Usuário', acao: 'editar_usuario' } },
        component: UsuarioEditarComponent,
      },
      {
        path: 'editarsenha',
        // canActivate: [PermissaoUsuarioGuard],
        // data: { permissao: { tela: 'Usuário', acao: 'alterar_senha_outro_usuario' } },
        component: UsuarioEditarSenhaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
