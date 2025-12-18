import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComissaoLicitacaoMembrosCriarComponent } from './criar/comissao-licitacao-membros-criar.component';
import { ComissaoLicitacaoMembrosEditarComponent } from './editar/comissao-licitacao-membros-editar.component';
import { ComissaoLicitacaoMembrosListarComponent } from './listar/comissao-licitacao-membros-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ComissaoLicitacaoMembrosListarComponent,
      },
      {
        path: 'criar',
        component: ComissaoLicitacaoMembrosCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ComissaoLicitacaoMembrosEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComissaoLicitacaoMembrosRoutingModule {}
