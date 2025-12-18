import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioAlmoxarifadoComponent } from './almoxarifado/almoxarifado.component';
import { PermissaoUsuarioGuard } from 'src/app/modules/guards/permissao-usuario/permissao-usuario.guard';

const routes: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    children: [
      {
        path: 'almoxarifado',
        canActivate: [PermissaoUsuarioGuard],
        data: { permissao: { tela: 'Relatório', acao: 'relatorio_almoxarifado' } },
        component: RelatorioAlmoxarifadoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioRoutingModule {}
