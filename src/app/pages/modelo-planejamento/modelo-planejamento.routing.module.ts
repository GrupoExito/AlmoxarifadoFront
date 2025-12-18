import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloPlanejamentoCriarComponent } from './criar/modelo-planejamento-criar.component';
import { ModeloPlanejamentoEditarComponent } from './editar/modelo-planejamento-editar.component';
import { ModeloPlanejamentoListarComponent } from './listar/modelo-planejamento-listar.component';
import { ModeloPlanejamentoProdutoComponent } from './produto/modelo-planejamento-produto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ModeloPlanejamentoListarComponent,
      },
      {
        path: 'criar',
        component: ModeloPlanejamentoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ModeloPlanejamentoEditarComponent,
      },
      {
        path: ':id/produtos',
        component: ModeloPlanejamentoProdutoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeloPlanejamentoRoutingModule {}
