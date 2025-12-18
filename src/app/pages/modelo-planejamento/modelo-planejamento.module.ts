import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloPlanejamentoListarComponent } from './listar/modelo-planejamento-listar.component';
import { ModeloPlanejamentoRoutingModule } from './modelo-planejamento.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModeloPlanejamentoCriarComponent } from './criar/modelo-planejamento-criar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModeloPlanejamentoEditarComponent } from './editar/modelo-planejamento-editar.component';
import { ModeloPlanejamentoProdutoComponent } from './produto/modelo-planejamento-produto.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    ModeloPlanejamentoListarComponent,
    ModeloPlanejamentoCriarComponent,
    ModeloPlanejamentoEditarComponent,
    ModeloPlanejamentoProdutoComponent,
  ],
  imports: [
    CommonModule,
    ModeloPlanejamentoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
  ],
})
export class ModeloPlanejamentoModule {}
