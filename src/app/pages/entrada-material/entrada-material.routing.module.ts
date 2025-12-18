import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaMateriaListarComponent } from './listar/entrada-material-listar.component';
import { EntradaMaterialCriarComponent } from './criar/entrada-material-criar.component';
import { EntradaMaterialEditarComponent } from './editar/entrada-material-editar.component';
import { EntradaMaterialComponent } from './entrada-material.component';
import { EntradaMaterialVisualizarComponent } from './visualizar/entrada-material-visualizar.component';
import { EntradaMaterialItemComponent } from './itens/entrada-material-itens.component';
import { EntradaMaterialHistoricoComponent } from './historico/entrada-material-historico.component';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';
import { EntradaMaterialAnexoComponent } from './anexo/entrada-material-anexo.component';

const routes: Routes = [
  {
    path: '',
    component: EntradaMaterialComponent,
    children: [
      {
        path: '',
         component: EntradaMateriaListarComponent,
      },
      {
        path: 'criar',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Almoxarifado', acao: 'nova_entrada' } },
        component: EntradaMaterialCriarComponent,
      },
      {
        path: 'editar/:id',
         component: EntradaMaterialEditarComponent,
      },
    ],
  },
  {
    path: 'view/:id',
    canActivate: [PermissaoUsuarioGuard],
    data: { permissao: { tela: 'Almoxarifado', acao: 'visualizar_entrada' } },
    component: EntradaMaterialVisualizarComponent,
    children: [
      {
        path: 'cadastro',
        component: EntradaMaterialCriarComponent,
      },
      {
        path: 'editar',
        component: EntradaMaterialEditarComponent,
      },
      {
        path: 'itens',
        component: EntradaMaterialItemComponent,
      },
      {
        path: 'historico',
        component: EntradaMaterialHistoricoComponent,
      },
      {
        path: 'anexos',
        component: EntradaMaterialAnexoComponent,
      },
    ],
  },
  {
    path: 'listar',
    component: EntradaMateriaListarComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: EntradaMateriaListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradaMateriaRoutingModule {}
