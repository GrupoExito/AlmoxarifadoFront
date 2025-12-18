import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';
import { ProcessosAndamentoRoutingModule } from './processos-andamento.routing.module';
import { ProcessosAndamentoComponent } from './listar/processos-andamento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { PermissionModule } from '@pages/shared/permission/permission.module';

@NgModule({
  declarations: [ProcessosAndamentoComponent],
  imports: [
    CommonModule,
    ProcessosAndamentoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    PermissionModule,
  ],
})
export class ProcessosAndamentoModule {}
