import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloCampoListarComponent } from './listar/modelo-campo-listar.component';
import { BancoRoutingModule } from './modelo-campo.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModeloCampoCriarComponent } from './criar/modelo-campo-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModeloCampoEditarComponent } from './editar/modelo-campo-editar.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ModeloCampoCriarComponent, ModeloCampoEditarComponent, ModeloCampoListarComponent],
  imports: [
    CommonModule,
    BancoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class ModeloCampoModule {}
