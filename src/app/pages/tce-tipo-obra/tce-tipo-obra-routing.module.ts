import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TceTipoObraCriarComponent } from './criar/tce-tipo-obra-criar.component';
import { TceTipoObraListarComponent } from './listar/tce-tipo-obra-listar.component';
import { TceTipoObraEditarComponent } from './editar/tce-tipo-obra-editar.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TceTipoObraListarComponent,
      },
      {
        path: 'criar',
        component: TceTipoObraCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TceTipoObraEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TceTipoObraRoutingModule {}
