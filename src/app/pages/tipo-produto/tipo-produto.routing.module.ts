import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoProdutoCriarComponent } from './criar/tipo-produto-criar.component';
import { TipoProdutoEditarComponent } from './editar/tipo-produto-editar.component';
import { TipoProdutoListarComponent } from './listar/tipo-produto-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TipoProdutoListarComponent,
      },
      {
        path: 'criar',
        component: TipoProdutoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TipoProdutoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoProdutoRoutingModule {}
