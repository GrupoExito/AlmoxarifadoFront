import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificacaoFornecedorListarComponent } from './listar/notificacao-fornecedor-listar.component';
import { NotificacaoFornecedorCriarComponent } from './criar/notificacao-fornecedor-criar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotificacaoFornecedorListarComponent,
      },
      {
        path: 'criar',
        component: NotificacaoFornecedorCriarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacaoFornecedorRoutingModule {}
