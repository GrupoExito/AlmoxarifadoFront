import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaidaMaterialComponent } from './saida-material.component';
import { SaidaMaterialCriarComponent } from './criar/saida-material-criar.component';
import { SaidaMaterialVisualizarComponent } from './visualizar/saida-material-visualizar.component';
import { SaidaMaterialEditarComponent } from './editar/saida-material-editar.component';
import { SaidaMateriaListarComponent } from './listar/saida-material-listar.component';
import { SaidaMaterialItemComponent } from './itens/saida-material-itens.component';
import { SaidaMaterialHistoricoComponent } from './historico/saida-material-historico.component';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';
import { SaidaMateriaListarPorCidadaoComponent } from './listar-por-cidadao/saida-material-listar-por-cidadao.component';
import { SaidaMaterialAnexoComponent } from './anexo/saida-material-anexo.component';
import { SaidaMateriaListarAutorizadorComponent } from './listar-por-autorizador/saida-material-listar-autorizador.component';
import { SaidaMaterialItemAutorizarComponent } from './autorizar/saida-material-itens-autorizar.component';
import { SaidaMaterialListarTransporteComponent } from './transporte/saida-material-listar-transporte.component';

const routes: Routes = [
  {
    path: '',
    component: SaidaMaterialComponent,
    children: [
      {
        path: 'criar',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Almoxarifado', acao: 'nova_saida' } },
        component: SaidaMaterialCriarComponent,
      },
    ],
  },
  {
    path: 'view/:id',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Almoxarifado', acao: 'visualizar_saida' } },
    component: SaidaMaterialVisualizarComponent,
    children: [
      {
        path: 'cadastro',
        component: SaidaMaterialCriarComponent,
      },
      {
        path: 'editar',
        component: SaidaMaterialEditarComponent,
      },
      {
        path: 'item',
        component: SaidaMaterialItemComponent,
      },
      {
        path: 'autorizar',
        component: SaidaMaterialItemAutorizarComponent,
      },
      {
        path: 'historico',
        component: SaidaMaterialHistoricoComponent,
      },
      {
        path: 'anexos',
        component: SaidaMaterialAnexoComponent,
      },
    ],
  },
  {
    path: 'listar',
    component: SaidaMateriaListarComponent,
  },
  {
    path: 'listar/porcidadao',
    component: SaidaMateriaListarPorCidadaoComponent,
  },
  {
    path: 'listar/porautorizador',
    component: SaidaMateriaListarAutorizadorComponent,
  },
    {
    path: 'transporte',
    component: SaidaMaterialListarTransporteComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: SaidaMateriaListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaidaMateriaRoutingModule {}
