import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { BiVisualizarComponent } from './visualizar/bi-visualizar.component';

@NgModule({
  declarations: [BiVisualizarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BiVisualizarComponent,
      },
    ]),
    PermissionModule,
  ],
})
export class BiModule {}
