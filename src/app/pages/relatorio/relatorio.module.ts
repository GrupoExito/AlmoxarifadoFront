import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RelatorioRoutingModule } from './relatorio.routing.module';
import { DataTablesModule } from 'angular-datatables';
import { RelatorioComponent } from './relatorio.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RelatorioAlmoxarifadoComponent } from './almoxarifado/almoxarifado.component';
import { RelatorioMovimentacaoPorEntradaComponent } from './almoxarifado/movimentacao-por-entrada/movimentacao-por-entrada.component';
import { RelatorioMovimentacaoPorEntradaFornecedorComponent } from './almoxarifado/movimentacao-por-entrada/movimentacao-por-entrada-fornecedor.component';
import { RelatorioMovimentacaoPorEntradaDataComponent } from './almoxarifado/movimentacao-por-entrada/movimentacao-por-entrada-data.component';
import { RelatorioMovimentacaoPorSaidaComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida.component';
import { RelatorioMovimentacaoPorSaidaDataComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida-data.component';
import { RelatorioMovimentacaoPorSaidaSetorComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida-setor.component';
import { RelatorioTransferenciamaterialComponent } from './almoxarifado/transferencia-material/transferencia-material.component';
import { RelatorioMaterialEstoqueComponent } from './almoxarifado/material-estoque/material-estoque.component';
import { RelatorioBalanceteEstoqueComponent } from './almoxarifado/balancete-estoque/balancete-estoque.component';
import { RelatorioMaterialEstoqueMinimoComponent } from './almoxarifado/material-estoque-minimo/material-estoque-minimo.component';
import { RelatorioExtratoMovimentacaoComponent } from './almoxarifado/extrato-movimentacao-material/extrato-movimentacao.component';
import { RelatorioEstoqueExcelComponent } from './almoxarifado/estoque-excel/relatorio-estoque-excel.component';
import { RelatorioMovimentacaoPorSaidaExcelComponent } from './almoxarifado/movimentacao-por-saida-excel/movimentacao-por-saida-excel.component';
import { RelatorioBalanceteEstoqueExcelComponent } from './almoxarifado/balancete-estoque-excel/balancete-estoque-excel.component';
import { RelatorioMovimentacaoPorSaidaSetorResumidoComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida-setor-resumido.component';
import { RelatorioBalanceteEstoquelotedatavalidadeComponent } from './almoxarifado/balancete-estoque-lote-data-validade/balancete-estoque-lote-data-validade.component';
import { RelatorioMaterialEstoqueZeradoComponent } from './almoxarifado/material-estoque-zerado/material-estoque-zerado.component';
import { RelatorioMaterialEstoqueSecretariaComponent } from './almoxarifado/material-estoque-secretaria/material-estoque-secretaria.component';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { RelatorioMaterialEstoqueLoteDataValidadeComponent } from './almoxarifado/material-estoque-lote-data-validade/material-estoque-lote-data-validade.component';
import { RelatorioEstoqueComponent } from './almoxarifado/estoque-pdf/relatorio-estoque.component';
import { RelatorioMovimentacaoPorSaidaCidadaoResumidoComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida-cidadao-resumido.component';
import { RelatorioMovimentacaoPorSaidaItemComponent } from './almoxarifado/movimentacao-por-saida/movimentacao-por-saida-item.component';
import { RelatorioMovimentacaoPorEntradaItemComponent } from './almoxarifado/movimentacao-por-entrada/movimentacao-por-entrada-item.component';


@NgModule({
  declarations: [
    RelatorioComponent,
    RelatorioAlmoxarifadoComponent,
    RelatorioMovimentacaoPorEntradaComponent,
    RelatorioMovimentacaoPorEntradaFornecedorComponent,
    RelatorioMovimentacaoPorEntradaDataComponent,
    RelatorioMovimentacaoPorSaidaComponent,
    RelatorioMovimentacaoPorSaidaDataComponent,
    RelatorioMovimentacaoPorSaidaItemComponent,
    RelatorioMovimentacaoPorSaidaSetorComponent,
    RelatorioMovimentacaoPorSaidaSetorResumidoComponent,
    RelatorioTransferenciamaterialComponent,
    RelatorioMaterialEstoqueComponent,
    RelatorioBalanceteEstoqueComponent,
    RelatorioMaterialEstoqueMinimoComponent,
    RelatorioExtratoMovimentacaoComponent,
    RelatorioEstoqueExcelComponent,
    RelatorioMovimentacaoPorSaidaExcelComponent,
    RelatorioBalanceteEstoqueExcelComponent,
    RelatorioBalanceteEstoquelotedatavalidadeComponent,
    RelatorioMaterialEstoqueZeradoComponent,
    RelatorioMaterialEstoqueSecretariaComponent,
    RelatorioMaterialEstoqueLoteDataValidadeComponent,
    RelatorioEstoqueComponent,
    RelatorioMovimentacaoPorSaidaCidadaoResumidoComponent,
    RelatorioMovimentacaoPorEntradaItemComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    RelatorioRoutingModule,
    NgSelectModule,
    FormsModule,
    PermissionModule,
  ],
})
export class RelatorioModule {}
