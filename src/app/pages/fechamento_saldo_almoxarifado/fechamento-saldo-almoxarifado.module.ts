import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { FechamentoSaldoAlmoxarifadoListarComponent } from './listar/fechamento-saldo-almoxarifado-listar.component';
import { FechamentoSaldoAlmoxarifadoCriarComponent } from './criar/fechamento-saldo-almoxarifado-criar.component';
import { FechamentoSaldoAlmoxarifadoRoutingModule } from './fechamento-saldo-almoxarifado.routing.module';


@NgModule({
  declarations: [FechamentoSaldoAlmoxarifadoListarComponent, FechamentoSaldoAlmoxarifadoCriarComponent],
  imports: [
    CommonModule,
    FechamentoSaldoAlmoxarifadoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
  ],
})
export class FechamentoSaldoAlmoxarifadoModule {}
