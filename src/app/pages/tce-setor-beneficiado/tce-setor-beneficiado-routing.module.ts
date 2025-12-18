import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TceSetorBeneficiadoCriarComponent } from './criar/tce-setor-beneficiado-criar.component';
import { TceSetorBeneficiadoListarComponent } from './listar/tce-setor-beneficiado-listar.component';
import { TceSetorBeneficiadoEditarComponent } from './editar/tce-setor-beneficiado-editar.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TceSetorBeneficiadoListarComponent,
      },
      {
        path: 'criar',
        component: TceSetorBeneficiadoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: TceSetorBeneficiadoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TceSetorBeneficiadoRoutingModule {}
