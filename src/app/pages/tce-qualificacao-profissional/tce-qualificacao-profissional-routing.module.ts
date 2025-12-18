import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TceQualificacaoProfissionalCriarComponent } from './criar/tce-qualificacao-profissional-criar.component';
import { TceQualificacaoProfissionalListarComponent } from './listar/tce-qualificacao-profissional-listar.component';
import { TceQualificacaoProfissionalEditarComponent } from './editar/tce-qualificacao-profissional-editar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TceQualificacaoProfissionalListarComponent,
      },
      {
        path: 'criar',
        component: TceQualificacaoProfissionalCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TceQualificacaoProfissionalEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TceQualificacaoProfissionalRoutingModule {}
