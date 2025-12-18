import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloDocumentoCriarComponent } from '../modelo-documento/criar/modelo-documento-criar.component';
import { ModeloDocumentoEditarComponent } from '../modelo-documento/editar/modelo-documento-editar.component';
import { ModeloDocumentoListarComponent } from '../modelo-documento/listar/modelo-documento-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ModeloDocumentoListarComponent,
      },
      {
        path: 'criar',
        component: ModeloDocumentoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: ModeloDocumentoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeloDocumentoRoutingModule {}
