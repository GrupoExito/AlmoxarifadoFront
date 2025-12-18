import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotacaoRealizadaComponent } from './cotacao/itens/cotacao-realizada.component';
import { CotacaoAutomatizadaComponent } from './cotacao/listar/cotacao-automatizada.component';
import { ExternalComponent } from './external.component';
import { FornecedorErrorComponent } from './fornecedor/error/fornecedor-error.component';
import { FornecedorLinkComponent } from './fornecedor/listar/fornecedor-link.component';
import { LogComponent } from './logs/log/log.component';
import { ValidadorComponent } from './validador/lista/validador.component';
import { DashboardAppComponent } from './dashboard-app/dashboard-app.component';

export const routes: Routes = [
  {
    path: '',
    component: ExternalComponent,
    children: [
      {
        path: 'fornecedor/cotacao/:id',
        component: FornecedorLinkComponent,
      },
      {
        path: 'fornecedor/error',
        component: FornecedorErrorComponent,
      },
      {
        path: 'cotacaoautomatizada/cotacao/:id',
        component: CotacaoAutomatizadaComponent,
      },
      {
        path: 'cotacaorealizada',
        component: CotacaoRealizadaComponent,
      },
      {
        path: 'cotacaoautomatizada/error',
        component: FornecedorErrorComponent,
      },
      {
        path: 'dashboard-app',
        component: DashboardAppComponent,
      },
      {
        path: 'logs',
        component: LogComponent,
      },
      { path: '', component: ValidadorComponent, },
      { path: ':id', component: ValidadorComponent, },
      { path: '**', redirectTo: 'fornecedor/error', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalRoutingModule {}
