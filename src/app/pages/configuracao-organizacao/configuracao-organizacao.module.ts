import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@pages/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { ConfiguracaoOrganizacaoComponent } from './configuracao-organizacao.component';
import { ConfiguracaoDFDComponent } from './configuracao-dfd/configuracao-dfd.component';
import { ConfiguracaoOrganizacaoRoutingModule } from './configuracao-organizacao-routing.module';
import { ConfiguracaoETPComponent } from './configuracao-etp/configuracao-etp.component';

@NgModule({
  declarations: [ConfiguracaoOrganizacaoComponent, ConfiguracaoDFDComponent, ConfiguracaoETPComponent],
  imports: [
    CommonModule,
    NgbModule,
    ConfiguracaoOrganizacaoRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    NgxCurrencyModule,
  ],
})
export class ConfiguracaoOrganizacaoModule {}
