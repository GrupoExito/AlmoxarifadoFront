import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigaExportarComponent } from './exportar/siga-exportar.component';
import { SigaImportarComponent } from './importar/siga-importar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'exportar',
        component: SigaExportarComponent,
      },
      {
        path: 'importar',
        component: SigaImportarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigaRoutingModule {}
