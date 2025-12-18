import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalidadeCompraCriarComponent } from './criar/modalidade-compra-criar.component';
import { ModalidadeCompraEditarComponent } from './editar/modalidade-compra-editar.component';
import { ModalidadeCompraListarComponent } from './listar/modalidade-compra-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ModalidadeCompraListarComponent,
      },
      {
        path: 'criar',
        component: ModalidadeCompraCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ModalidadeCompraEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalidadeCompraRoutingModule {}
