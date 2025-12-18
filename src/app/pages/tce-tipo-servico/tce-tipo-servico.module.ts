import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { TipoCertidaoRoutingModule } from '@pages/tipo-certidao/tipo-certidao.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TceTipoServicoCriarComponent } from './criar/tce-tipo-servico-criar.component';
import { TceTipoServicoListarComponent } from './listar/tce-tipo-servico-listar.component';
import { TceTipoServicoEditarComponent } from './editar/tce-tipo-servico-editar.component';

@NgModule({
  declarations: [
    TceTipoServicoCriarComponent,
    TceTipoServicoListarComponent,
    TceTipoServicoEditarComponent, 
 ],
  imports: [
    CommonModule,
    TipoCertidaoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TceSetorBeneficiadoModule {}
