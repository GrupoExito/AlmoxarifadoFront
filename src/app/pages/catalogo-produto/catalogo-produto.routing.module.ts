import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoProdutoCriarComponent } from './criar/catalogo-produto-criar.component';
import { CatalogoProdutoListarComponent } from './listar/catalogo-produto-listar.component';
import { CatalogoProdutoEditarComponent } from './editar/catalogo-produto-editar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CatalogoProdutoListarComponent,
      },
      {
        path: 'criar',
        component: CatalogoProdutoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: CatalogoProdutoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoProdutoRoutingModule {}
