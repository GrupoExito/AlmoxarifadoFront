import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretariaFundoCriarComponent } from './criar/secretaria-fundo-criar.component';
import { SecretariaFundoEditarComponent } from './editar/secretaria-fundo-editar.component';
import { SecretariaFundoListarComponent } from './listar/secretaria-fundo-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SecretariaFundoListarComponent,
      },
      {
        path: 'criar',
        component: SecretariaFundoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: SecretariaFundoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecretariaFundoRoutingModule {}
