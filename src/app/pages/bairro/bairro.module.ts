import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BairroCriarComponent } from './criar/bairro-criar.component';
import { BairroEditarComponent } from './editar/bairro-editar.component';
import { BairroListarComponent } from './listar/bairro-listar.component';
import { BairroRoutingModule } from './bairro.routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [BairroCriarComponent, BairroEditarComponent, BairroListarComponent],
  imports: [
    CommonModule,
    BairroRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class BairroModule {}
