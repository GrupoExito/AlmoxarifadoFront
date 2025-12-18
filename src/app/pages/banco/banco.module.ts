import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancoListarComponent } from './listar/banco-listar.component';
import { BancoRoutingModule } from './banco.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BancoCriarComponent } from './criar/banco-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BancoEditarComponent } from './editar/banco-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '@pages/shared/shared.module';

@NgModule({
  declarations: [BancoCriarComponent, BancoEditarComponent, BancoListarComponent],
  imports: [
    CommonModule,
    BancoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule
  ],
})
export class BancoModule {}
