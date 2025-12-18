import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SetorCriarComponent } from './criar/setor-criar.component';
import { SetorEditarComponent } from './editar/setor-editar.component';
import { SetorListarComponent } from './listar/setor-listar.component';
import { SetorRoutingModule } from './setor.routing.module';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';

@NgModule({
  declarations: [SetorCriarComponent, SetorEditarComponent, SetorListarComponent],
  imports: [
    CommonModule,
    SetorRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class SetorModule {}
