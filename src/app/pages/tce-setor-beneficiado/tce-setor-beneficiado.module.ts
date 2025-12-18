import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { TipoCertidaoRoutingModule } from '@pages/tipo-certidao/tipo-certidao.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TceSetorBeneficiadoCriarComponent } from './criar/tce-setor-beneficiado-criar.component';
import { TceSetorBeneficiadoListarComponent } from './listar/tce-setor-beneficiado-listar.component';
import { TceSetorBeneficiadoEditarComponent } from './editar/tce-setor-beneficiado-editar.component';

@NgModule({
  declarations: [
    TceSetorBeneficiadoCriarComponent,
    TceSetorBeneficiadoListarComponent,
    TceSetorBeneficiadoEditarComponent, 
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
