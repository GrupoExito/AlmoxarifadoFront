import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeMedidaListarComponent } from './listar/unidade-medida-listar.component';
import { UnidadeMedidaRoutingModule } from './unidade-medida.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UnidadeMedidaCriarComponent } from './criar/unidade-medida-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UnidadeMedidaEditarComponent } from './editar/unidade-medida-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [UnidadeMedidaListarComponent, UnidadeMedidaCriarComponent, UnidadeMedidaEditarComponent],
  imports: [
    CommonModule,
    UnidadeMedidaRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class UnidadeMedidaModule {}
