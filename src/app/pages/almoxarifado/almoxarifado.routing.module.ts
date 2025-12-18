import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmoxarifadoCriarComponent } from './criar/almoxarifado-criar.component';
import { AlmoxarifadoEditarComponent } from './editar/almoxarifado-editar.component';
import { AlmoxarifadoListarComponent } from './listar/almoxarifado-listar.component';
import { AlmoxarifadoVisualizarComponent } from './visualizar/almoxarifado-visualizar.component';
import { AlmoxarifadoItemComponent } from './itens/itens.component';
import { AlmoxarifadoUsuarioComponent } from './usuario/almoxarifado-usuario.component';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: '',
         component: AlmoxarifadoListarComponent,
      },
      {
        path: 'criar',
        component: AlmoxarifadoCriarComponent,
      },
      {
         path: 'editar/:id',
         component: AlmoxarifadoEditarComponent,
      },
      {
        path: ':id/usuario',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Almoxarifado', acao: 'associar_usuario' }},
        component: AlmoxarifadoUsuarioComponent,
      },
    ],
  },
  {
    path: 'view/:id',
    component: AlmoxarifadoVisualizarComponent,
    children: [
      {
        path: 'cadastro',
        component: AlmoxarifadoCriarComponent,
      },
      {
        path: 'editar',
        component: AlmoxarifadoEditarComponent,
      },
      {
        path: 'itens',
        component: AlmoxarifadoItemComponent,
      },
      
    ],
  },
  {
    path: 'listar',
    component: AlmoxarifadoListarComponent,
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: AlmoxarifadoListarComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmoxarifadoRoutingModule { }
