import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoProdutoRoutingModule } from './catalogo-produto.routing.module';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoProdutoCriarComponent } from './criar/catalogo-produto-criar.component';
import { CatalogoProdutoListarComponent } from './listar/catalogo-produto-listar.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CatalogoProdutoEditarComponent } from './editar/catalogo-produto-editar.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [CatalogoProdutoListarComponent, CatalogoProdutoCriarComponent, CatalogoProdutoEditarComponent],
  imports: [
    CommonModule,
    CatalogoProdutoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    NgbPaginationModule,
    FormsModule,
    NgSelectModule,
    NgxDropzoneModule,
  ],
})
export class CatalogoProdutoModule {}
