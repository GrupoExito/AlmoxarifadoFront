import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipioCriarComponent } from './criar/municipio-criar.component';
import { MunicipioEditarComponent } from './editar/municipio-editar.component';
import { MunicipioListarComponent } from './listar/municipio-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MunicipioListarComponent,
      },
      {
        path: 'criar',
        component: MunicipioCriarComponent,
      },
      {
        path: 'editar/:id',
        component: MunicipioEditarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipioRoutingModule {}
