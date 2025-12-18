import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoServicoCriarComponent } from './criar/produto-servico-criar.component';
import { ProdutoServicoEditarComponent } from './editar/produto-servico-editar.component';
import { ProdutoServicoListarComponent } from './listar/produto-servico-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProdutoServicoListarComponent,
      },
      {
        path: 'criar',
        component: ProdutoServicoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ProdutoServicoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoServicoRoutingModule {}
