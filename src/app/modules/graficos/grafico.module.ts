import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Donut1Component } from './donut/donut1.component';
import { Donut2Component } from './donut2/donut2.component';
import { Donut3Component } from './donut3/donut3.component';
import { Statistics1Component } from './statistics/statistics1.component';
import { TablesWidget51Component } from './tables-widget5/tables-widget51.component';

@NgModule({
  declarations: [Donut1Component, Donut2Component, Donut3Component, Statistics1Component, TablesWidget51Component],
  imports: [CommonModule, InlineSVGModule, NgApexchartsModule, NgbDropdownModule],
  exports: [Donut1Component, Donut2Component, Donut3Component, Statistics1Component, TablesWidget51Component],
})
export class GraficoModule {}
