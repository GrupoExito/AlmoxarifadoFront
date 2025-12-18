import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExternalRoutingModule } from './external-routing.module';
import { ExternalComponent } from './external.component';
import { FornecedorLinkComponent } from './fornecedor/listar/fornecedor-link.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CotacaoAutomatizadaComponent } from './cotacao/listar/cotacao-automatizada.component';
import { SharedModule } from '@pages/shared/shared.module';
import { CotacaoRealizadaComponent } from './cotacao/itens/cotacao-realizada.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LogComponent } from './logs/log/log.component';
import { ValidadorComponent } from './validador/lista/validador.component';
import { DashboardAppComponent } from './dashboard-app/dashboard-app.component';
@NgModule({
  declarations: [
    ExternalComponent,
    FornecedorLinkComponent,
    CotacaoAutomatizadaComponent,
    CotacaoRealizadaComponent,
    LogComponent,
    ValidadorComponent,
    DashboardAppComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ExternalRoutingModule,
    InlineSVGModule,
    NgbModule,
    DataTablesModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    NgSelectModule,
  ],
})
export class ExternalModule {}
