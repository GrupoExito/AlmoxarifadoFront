import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoServicoRoutingModule } from './produto-servico.routing.module';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoServicoCriarComponent } from './criar/produto-servico-criar.component';
import { ProdutoServicoListarComponent } from './listar/produto-servico-listar.component';
import { ProdutoServicoEditarComponent } from './editar/produto-servico-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { ProdutoEstoqueAlmoxarifadoComponent } from './produto-estoque-almoxarifado/produto-estoque-almoxarifado.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProdutoServicoListarComponent,
    ProdutoServicoCriarComponent,
    ProdutoServicoEditarComponent,
    ProdutoEstoqueAlmoxarifadoComponent,
  ],
  imports: [
    CommonModule,
    ProdutoServicoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    NgbPaginationModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class ProdutoServicoModule {}
