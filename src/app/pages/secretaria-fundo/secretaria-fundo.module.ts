import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretariaFundoListarComponent } from './listar/secretaria-fundo-listar.component';
import { SecretariaFundoRoutingModule } from './secretaria-fundo.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SecretariaFundoCriarComponent } from './criar/secretaria-fundo-criar.component';
import { SecretariaFundoEditarComponent } from './editar/secretaria-fundo-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@pages/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [SecretariaFundoListarComponent, SecretariaFundoCriarComponent, SecretariaFundoEditarComponent],
  imports: [
    CommonModule,
    SecretariaFundoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    NgSelectModule,
  ],
})
export class SecretariaFundoModule {}
