import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SigaRoutingModule } from './siga.routing.module';
import { SigaExportarComponent } from './exportar/siga-exportar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SigaImportarComponent } from './importar/siga-importar.component';

@NgModule({
  declarations: [SigaExportarComponent, SigaImportarComponent],
  imports: [
    CommonModule,
    SigaRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class SigaModule {}
