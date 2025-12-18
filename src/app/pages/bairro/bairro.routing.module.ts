import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BairroCriarComponent } from './criar/bairro-criar.component';
import { BairroEditarComponent } from './editar/bairro-editar.component';
import { BairroListarComponent } from './listar/bairro-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BairroListarComponent,
      },
      {
        path: 'criar',
        component: BairroCriarComponent,
      },
      {
        path: 'editar/:id',
        component: BairroEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BairroRoutingModule {}
