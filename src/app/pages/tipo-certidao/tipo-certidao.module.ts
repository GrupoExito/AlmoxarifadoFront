import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCertidaoListarComponent } from './listar/tipo-certidao-listar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoCertidaoCriarComponent } from './criar/tipo-certidao-criar.component';
import { TipoCertidaoRoutingModule } from './tipo-certidao.routing.module';
import { TipoCertidaoEditarComponent } from './editar/tipo-certidao-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [TipoCertidaoListarComponent, TipoCertidaoCriarComponent, TipoCertidaoEditarComponent],
  imports: [
    CommonModule,
    TipoCertidaoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TipoCertidaoModule {}
