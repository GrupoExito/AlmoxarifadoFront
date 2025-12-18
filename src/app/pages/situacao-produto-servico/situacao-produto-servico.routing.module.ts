import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituacaoProdutoServicoCriarComponent } from './criar/situacao-produto-servico-criar.component';
import { SituacaoProdutoServicoEditarComponent } from './editar/situacao-produto-servico-editar.component';
import { SituacaoProdutoServicoListarComponent } from './listar/situacao-produto-servico-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SituacaoProdutoServicoListarComponent,
      },
      {
        path: 'criar',
        component: SituacaoProdutoServicoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: SituacaoProdutoServicoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SituacaoProdutoServicoRoutingModule {}
