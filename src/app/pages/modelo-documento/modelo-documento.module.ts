import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloDocumentoListarComponent } from './listar/modelo-documento-listar.component';
import { ModeloDocumentoRoutingModule } from './modelo-documento.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModeloDocumentoCriarComponent } from './criar/modelo-documento-criar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModeloDocumentoEditarComponent } from './editar/modelo-documento-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [ModeloDocumentoCriarComponent, ModeloDocumentoEditarComponent, ModeloDocumentoListarComponent],
  imports: [
    CommonModule,
    ModeloDocumentoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    NgxEditorModule,
    CKEditorModule,
  ],
})
export class ModeloDocumentoModule {}
