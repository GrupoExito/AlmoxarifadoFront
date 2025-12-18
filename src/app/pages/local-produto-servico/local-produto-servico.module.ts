import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LocalProdutoServicoCriarComponent } from './criar/local-produto-servico-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalProdutoServicoRoutingModule } from './local-produto-servico.routing.module';
import { LocalProdutoServicoListarComponent } from './listar/local-produto-servico-listar.component';
import { LocalProdutoServicoEditarComponent } from './editar/local-produto-servico-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    LocalProdutoServicoListarComponent,
    LocalProdutoServicoCriarComponent,
    LocalProdutoServicoEditarComponent,
  ],
  imports: [
    CommonModule,
    LocalProdutoServicoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class LocalProdutoServicoModule {}
