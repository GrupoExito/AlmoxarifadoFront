import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituacaoProdutoServicoListarComponent } from './listar/situacao-produto-servico-listar.component';
import { SituacaoProdutoServicoRoutingModule } from './situacao-produto-servico.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SituacaoProdutoServicoCriarComponent } from './criar/situacao-produto-servico-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SituacaoProdutoServicoEditarComponent } from './editar/situacao-produto-servico-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    SituacaoProdutoServicoListarComponent,
    SituacaoProdutoServicoCriarComponent,
    SituacaoProdutoServicoEditarComponent,
  ],
  imports: [
    CommonModule,
    SituacaoProdutoServicoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class SituacaoProdutoServicoModule {}
