import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgaoCriarComponent } from './criar/orgao-criar.component';
import { OrgaoEditarComponent } from './editar/orgao-editar.component';
import { OrgaoListarComponent } from './listar/orgao-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrgaoListarComponent,
      },
      {
        path: 'criar',
        component: OrgaoCriarComponent,
      },
      {
        path: 'editar/:id',
        component: OrgaoEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgaoRoutingModule {}
