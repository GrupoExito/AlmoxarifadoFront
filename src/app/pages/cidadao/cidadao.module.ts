import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { CidadaoRoutingModule } from './cidadao.routing.module';
import { CidadaoCriarComponent } from './criar/cidadao-criar.component';
import { CidadaoEditarComponent } from './editar/cidadao-editar.component';
import { CidadaoListarComponent } from './listar/cidadao-listar.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CidadaoCriarComponent, CidadaoEditarComponent, CidadaoListarComponent],
  imports: [
    CommonModule,
    CidadaoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
  ],
})
export class CidadaoModule {}
