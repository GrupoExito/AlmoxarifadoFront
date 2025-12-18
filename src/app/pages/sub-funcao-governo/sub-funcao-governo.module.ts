import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SubFuncaoGovernoCriarComponent } from './criar/sub-funcao-governo-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubFuncaoGovernoRoutingModule } from './sub-funcao-governo.routing.module';
import { SubFuncaoGovernoListarComponent } from './listar/sub-funcao-governo-listar.component';
import { SubFuncaoGovernoEditarComponent } from './editar/sub-funcao-governo-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SubFuncaoGovernoListarComponent, SubFuncaoGovernoCriarComponent, SubFuncaoGovernoEditarComponent],
  imports: [
    CommonModule,
    SubFuncaoGovernoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class SubFuncaoGovernoModule {}
