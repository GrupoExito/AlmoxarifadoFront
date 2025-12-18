import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloCampoCriarComponent } from './criar/modelo-campo-criar.component';
import { ModeloCampoEditarComponent } from './editar/modelo-campo-editar.component';
import { ModeloCampoListarComponent } from './listar/modelo-campo-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ModeloCampoListarComponent,
      },
      {
        path: 'criar',
        component: ModeloCampoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ModeloCampoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BancoRoutingModule {}
