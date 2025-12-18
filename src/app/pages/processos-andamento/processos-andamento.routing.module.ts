import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessosAndamentoComponent } from './listar/processos-andamento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProcessosAndamentoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessosAndamentoRoutingModule {}
