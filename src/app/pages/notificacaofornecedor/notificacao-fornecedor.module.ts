import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificacaoFornecedorListarComponent } from './listar/notificacao-fornecedor-listar.component';
import { NotificacaoFornecedorCriarComponent } from './criar/notificacao-fornecedor-criar.component';
import { NotificacaoFornecedorRoutingModule } from './notificacao-fornecedor.routing.module';

@NgModule({
  declarations: [NotificacaoFornecedorListarComponent, NotificacaoFornecedorCriarComponent],
  imports: [
    CommonModule,
    NotificacaoFornecedorRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
  ],
})
export class NotificacaoFornecedorModule {}
