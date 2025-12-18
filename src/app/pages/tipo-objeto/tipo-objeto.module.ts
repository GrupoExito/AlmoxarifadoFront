import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoObjetoListarComponent } from './listar/tipo-objeto-listar.component';
import { TipoObjetoRoutingModule } from './tipo-objeto.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TipoObjetoCriarComponent } from './criar/tipo-objeto-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';

@NgModule({
  declarations: [TipoObjetoCriarComponent, TipoObjetoListarComponent],
  imports: [
    CommonModule,
    TipoObjetoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class TipoObjetoModule {}
