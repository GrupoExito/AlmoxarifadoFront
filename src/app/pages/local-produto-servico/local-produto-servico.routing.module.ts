import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalProdutoServicoCriarComponent } from './criar/local-produto-servico-criar.component';
import { LocalProdutoServicoEditarComponent } from './editar/local-produto-servico-editar.component';
import { LocalProdutoServicoListarComponent } from './listar/local-produto-servico-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LocalProdutoServicoListarComponent,
      },
      {
        path: 'criar',
        component: LocalProdutoServicoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: LocalProdutoServicoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalProdutoServicoRoutingModule {}
