import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorListarComponent } from './listar/fornecedor-listar.component';
import { FornecedorRoutingModule } from './fornecedor.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FornecedorCriarComponent } from './criar/fornecedor-criar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedorEditarComponent } from './editar/fornecedor-editar.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { FornecedorCertidaoComponent } from './certidao/fornecedor-certidao.component';
import { SharedModule } from '@pages/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    FornecedorCriarComponent,
    FornecedorEditarComponent,
    FornecedorListarComponent,
    FornecedorCertidaoComponent,
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ],
})
export class FornecedorModule {}
