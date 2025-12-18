import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './main/dashboard.component';
import { GraficoModule } from 'src/app/modules/graficos/grafico.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardModelo01Component } from './modelo01/dashboard-modelo01.component';
import { SatisfacaoModalComponent } from './satisfacao/satisfacao.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';

@NgModule({
  declarations: [DashboardComponent, DashboardModelo01Component, SatisfacaoModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '01',
        component: DashboardModelo01Component,
      },
    ]),
    GraficoModule,
    InlineSVGModule,
    NgApexchartsModule,
    DropdownMenusModule,
    PermissionModule,
  ],
})
export class DashboardModule {}
