import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FechamentoSaldoAlmoxarifadoCriarComponent } from './criar/fechamento-saldo-almoxarifado-criar.component';
import { FechamentoSaldoAlmoxarifadoListarComponent } from './listar/fechamento-saldo-almoxarifado-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listar',
        component: FechamentoSaldoAlmoxarifadoListarComponent,
      },
      {
        path: 'criar',
        component: FechamentoSaldoAlmoxarifadoCriarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FechamentoSaldoAlmoxarifadoRoutingModule {}
