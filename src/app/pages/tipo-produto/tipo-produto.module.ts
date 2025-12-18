import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoProdutoListarComponent } from './listar/tipo-produto-listar.component';
import { TipoProdutoRoutingModule } from './tipo-produto.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TipoProdutoCriarComponent } from './criar/tipo-produto-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoProdutoEditarComponent } from './editar/tipo-produto-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [TipoProdutoListarComponent, TipoProdutoCriarComponent, TipoProdutoEditarComponent],
  imports: [
    CommonModule,
    TipoProdutoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TipoProdutoModule {}
