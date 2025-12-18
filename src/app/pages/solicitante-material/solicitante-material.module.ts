import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SolicitanteListarComponent } from './listar/solicitante-material-listar.component';
import { SolicitanteCriarComponent } from './criar/solicitante-material-criar.component';
import { SolicitanteEditarComponent } from './editar/solicitante-material-editar.component';
import { SolicitanteRoutingModule } from './solicitante-material.routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [SolicitanteListarComponent, SolicitanteCriarComponent, SolicitanteEditarComponent],
  imports: [
    CommonModule,
    SolicitanteRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
  ],
})
export class SolicitanteModule {}
