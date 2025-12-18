import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracaoOrganizacaoComponent } from './configuracao-organizacao.component';
import { ConfiguracaoDFDComponent } from './configuracao-dfd/configuracao-dfd.component';
import { ConfiguracaoETPComponent } from './configuracao-etp/configuracao-etp.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoOrganizacaoComponent,
    children: [
      {
        path: 'dfd',
        component: ConfiguracaoDFDComponent,
      },
      {
        path: 'etp',
        component: ConfiguracaoETPComponent,
      },
    ],
  },
  { path: '', redirectTo: 'listar', pathMatch: 'full', component: ConfiguracaoOrganizacaoComponent },
  { path: '**', redirectTo: 'listar', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracaoOrganizacaoRoutingModule {}
