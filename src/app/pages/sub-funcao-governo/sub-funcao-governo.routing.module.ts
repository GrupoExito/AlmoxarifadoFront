import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubFuncaoGovernoCriarComponent } from './criar/sub-funcao-governo-criar.component';
import { SubFuncaoGovernoEditarComponent } from './editar/sub-funcao-governo-editar.component';
import { SubFuncaoGovernoListarComponent } from './listar/sub-funcao-governo-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SubFuncaoGovernoListarComponent,
      },
      {
        path: 'criar',
        component: SubFuncaoGovernoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: SubFuncaoGovernoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubFuncaoGovernoRoutingModule {}
