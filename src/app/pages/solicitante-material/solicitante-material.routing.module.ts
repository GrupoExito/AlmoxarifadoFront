import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitanteListarComponent } from './listar/solicitante-material-listar.component';
import { SolicitanteCriarComponent } from './criar/solicitante-material-criar.component';
import { SolicitanteEditarComponent } from './editar/solicitante-material-editar.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SolicitanteListarComponent,
      },
      {
        path: 'criar',
        component: SolicitanteCriarComponent,
      },
      {
        path: 'editar/:id',
        component: SolicitanteEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitanteRoutingModule {}
