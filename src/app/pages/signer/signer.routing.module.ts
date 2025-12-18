import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignerComponent } from './signer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: SignerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignerRoutingModule {}
