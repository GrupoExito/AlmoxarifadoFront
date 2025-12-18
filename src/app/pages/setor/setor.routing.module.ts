import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorCriarComponent } from './criar/setor-criar.component';
import { SetorEditarComponent } from './editar/setor-editar.component';
import { SetorListarComponent } from './listar/setor-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SetorListarComponent,
      },
      {
        path: 'criar',
        component: SetorCriarComponent,
      },
      {
        path: 'editar/:id',
        component: SetorEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetorRoutingModule {}
