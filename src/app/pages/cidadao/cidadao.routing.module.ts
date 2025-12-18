import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadaoListarComponent } from './listar/cidadao-listar.component';
import { CidadaoCriarComponent } from './criar/cidadao-criar.component';
import { CidadaoEditarComponent } from './editar/cidadao-editar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CidadaoListarComponent,
      },
      {
        path: 'criar',
        component: CidadaoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: CidadaoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadaoRoutingModule {}
