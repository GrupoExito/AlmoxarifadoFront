import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@pages/shared/shared.module';
import { PermissionModule } from '@pages/shared/permission/permission.module';
import { TermoReferencialRoutingModule } from './termo-referencia-routing.module';
import { TermoReferenciaListarComponent } from './listar/termo-referencia-listar.component';
import { TermoReferenciaComponent } from './termo-referencia.component';
import { TermoReferenciaCadastroComponent } from './cadastro/termo-referencia-cadastro.component';
import { TermoReferenciaFluxoComponent } from './fluxo-termo-referencia/termo-referencia-fluxo.component';
import { TermoReferenciaEtapaComponent } from './etapas/termo-referencia-etapa.component';
import { TermoReferenciaEditarComponent } from './editar/termo-referencia-editar.component';
import { TermoReferenciaVisualizarComponent } from './visualizar/termo-referencia-visualizar.component';
import { TermoReferenciaHistoricoComponent } from './historico/termo-referencia-historico.component';
import { TermoReferenciaAnexoComponent } from './anexo/termo-referencia-anexo.component';
import { TermoReferenciaPadComponent } from './pad/termo-referencial-pad.component';
import { TermoReferenciaModeloDocumentoComponent } from './modelo-documento/termo-referencial-modelo-documento.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PrecoReferencialComponent } from './preco-referencial/preco-referencial.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    TermoReferenciaComponent,
    TermoReferenciaListarComponent,
    TermoReferenciaCadastroComponent,
    TermoReferenciaFluxoComponent,
    TermoReferenciaEtapaComponent,
    TermoReferenciaEditarComponent,
    TermoReferenciaVisualizarComponent,
    TermoReferenciaPadComponent,
    TermoReferenciaHistoricoComponent,
    TermoReferenciaAnexoComponent,
    TermoReferenciaModeloDocumentoComponent,
    PrecoReferencialComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    TermoReferencialRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    PermissionModule,
    CKEditorModule,
    EditorModule,
  ],
})
export class TermoReferenciaModule {}
