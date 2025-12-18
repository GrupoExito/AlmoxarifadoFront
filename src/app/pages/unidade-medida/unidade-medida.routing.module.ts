import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadeMedidaCriarComponent } from './criar/unidade-medida-criar.component';
import { UnidadeMedidaEditarComponent } from './editar/unidade-medida-editar.component';
import { UnidadeMedidaListarComponent } from './listar/unidade-medida-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UnidadeMedidaListarComponent,
      },
      {
        path: 'criar',
        component: UnidadeMedidaCriarComponent,
      },
      {
        path: 'editar/:id',
        component: UnidadeMedidaEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadeMedidaRoutingModule {}
