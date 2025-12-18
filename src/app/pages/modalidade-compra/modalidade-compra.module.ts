import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalidadeCompraListarComponent } from './listar/modalidade-compra-listar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalidadeCompraRoutingModule } from './modalidade-compra.routing.module';
import { ModalidadeCompraCriarComponent } from './criar/modalidade-compra-criar.component';
import { ModalidadeCompraEditarComponent } from './editar/modalidade-compra-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ModalidadeCompraListarComponent, ModalidadeCompraCriarComponent, ModalidadeCompraEditarComponent],
  imports: [
    CommonModule,
    ModalidadeCompraRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class ModalidadeCompraModule {}
