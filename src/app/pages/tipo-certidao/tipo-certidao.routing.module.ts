import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoCertidaoCriarComponent } from './criar/tipo-certidao-criar.component';
import { TipoCertidaoEditarComponent } from './editar/tipo-certidao-editar.component';
import { TipoCertidaoListarComponent } from './listar/tipo-certidao-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TipoCertidaoListarComponent,
      },
      {
        path: 'criar',
        component: TipoCertidaoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TipoCertidaoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCertidaoRoutingModule {}
