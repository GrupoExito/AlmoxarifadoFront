import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { TipoCertidaoRoutingModule } from '@pages/tipo-certidao/tipo-certidao.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {  TceTipoObraCriarComponent } from './criar/tce-tipo-obra-criar.component';
import { TceTipoObraEditarComponent } from './editar/tce-tipo-obra-editar.component';
import { TceTipoObraListarComponent } from './listar/tce-tipo-obra-listar.component';

@NgModule({
  declarations: [
    TceTipoObraCriarComponent,
    TceTipoObraListarComponent,
    TceTipoObraEditarComponent, 
 ],
  imports: [
    CommonModule,
    TipoCertidaoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TceSetorBeneficiadoModule {}
