import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorCertidaoComponent } from './certidao/fornecedor-certidao.component';
import { FornecedorCriarComponent } from './criar/fornecedor-criar.component';
import { FornecedorEditarComponent } from './editar/fornecedor-editar.component';
import { FornecedorListarComponent } from './listar/fornecedor-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FornecedorListarComponent,
      },
      {
        path: 'criar',
        component: FornecedorCriarComponent,
      },
      {
        path: 'editar/:id',
        component: FornecedorEditarComponent,
      },
      {
        path: ':id/certidao',
        component: FornecedorCertidaoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FornecedorRoutingModule {}
