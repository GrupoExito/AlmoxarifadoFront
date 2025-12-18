import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TceTipoServicoListarComponent } from './listar/tce-tipo-servico-listar.component';
import { TceTipoServicoCriarComponent } from './criar/tce-tipo-servico-criar.component';
import { TceTipoServicoEditarComponent } from './editar/tce-tipo-servico-editar.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TceTipoServicoListarComponent,
      },
      {
        path: 'criar',
        component: TceTipoServicoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TceTipoServicoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TceTipoServicoRoutingModule {}
