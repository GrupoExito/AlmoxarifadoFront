import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoCriarComponent } from './criar/endereco-criar.component';
import { EnderecoListarComponent } from './listar/endereco-listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EnderecoListarComponent,
      },
      {
        path: 'criar',
        component: EnderecoCriarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoRoutingModule {}
