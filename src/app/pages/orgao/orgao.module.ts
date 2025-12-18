import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaoListarComponent } from './listar/orgao-listar.component';
import { OrgaoRoutingModule } from './orgao.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { OrgaoCriarComponent } from './criar/orgao-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrgaoEditarComponent } from './editar/orgao-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [OrgaoCriarComponent, OrgaoEditarComponent, OrgaoListarComponent],
  imports: [
    CommonModule,
    OrgaoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
  ],
})
export class OrgaoModule {}
