import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoObjetoListarComponent } from './listar/tipo-objeto-listar.component';
import { TipoObjetoCriarComponent } from './criar/tipo-objeto-criar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TipoObjetoListarComponent,
      },
      {
        path: 'criar',
        component: TipoObjetoCriarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoObjetoRoutingModule {}
