import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaCriarComponent } from './criar/pessoa-criar.component';
import { PessoaEditarComponent } from './editar/pessoa-editar.component';
import { PessoaListarComponent } from './listar/pessoa-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PessoaListarComponent,
      },
      {
        path: 'criar',
        component: PessoaCriarComponent,
      },
      {
        path: 'editar/:id',
        component: PessoaEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
