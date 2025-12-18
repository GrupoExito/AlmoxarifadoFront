import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancoCriarComponent } from './criar/banco-criar.component';
import { BancoEditarComponent } from './editar/banco-editar.component';
import { BancoListarComponent } from './listar/banco-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BancoListarComponent,
      },
      {
        path: 'criar',
        component: BancoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: BancoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BancoRoutingModule {}
