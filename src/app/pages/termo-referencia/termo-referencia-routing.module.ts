import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermoReferenciaComponent } from './termo-referencia.component';
import { TermoReferenciaCadastroComponent } from './cadastro/termo-referencia-cadastro.component';
import { TermoReferenciaListarComponent } from './listar/termo-referencia-listar.component';
import { TermoReferenciaEditarComponent } from './editar/termo-referencia-editar.component';
import { TermoReferenciaVisualizarComponent } from './visualizar/termo-referencia-visualizar.component';
import { TermoReferenciaAnexoComponent } from './anexo/termo-referencia-anexo.component';
import { TermoReferenciaHistoricoComponent } from './historico/termo-referencia-historico.component';
import { TermoReferenciaPadComponent } from './pad/termo-referencial-pad.component';
import { TermoReferenciaModeloDocumentoComponent } from './modelo-documento/termo-referencial-modelo-documento.component';
import { PrecoReferencialComponent } from './preco-referencial/preco-referencial.component';
const routes: Routes = [
  {
    path: '',
    component: TermoReferenciaComponent,
    children: [
      {
        path: 'cadastro',
        component: TermoReferenciaCadastroComponent,
      },
    ],
  },
  {
    path: 'view/:id',
    component: TermoReferenciaVisualizarComponent,
    children: [
      {
        path: 'cadastro',
        component: TermoReferenciaCadastroComponent,
      },
      {
        path: 'pad',
        component: TermoReferenciaPadComponent,
      },
      {
        path: 'precoreferencial',
        component: PrecoReferencialComponent,
      },
      {
        path: 'modelodocumento',
        component: TermoReferenciaModeloDocumentoComponent,
      },
      {
        path: 'anexos',
        component: TermoReferenciaAnexoComponent,
      },
      {
        path: 'editar',
        component: TermoReferenciaEditarComponent,
      },
      {
        path: 'historico',
        component: TermoReferenciaHistoricoComponent,
      },
    ],
  },
  {
    path: 'listar',
    component: TermoReferenciaListarComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: TermoReferenciaListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermoReferencialRoutingModule {}
