import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { TceQualificacaoProfissionalCriarComponent } from './criar/tce-qualificacao-profissional-criar.component';
import { TceQualificacaoProfissionalEditarComponent } from './editar/tce-qualificacao-profissional-editar.component';
import { TceQualificacaoProfissionalListarComponent } from './listar/tce-qualificacao-profissional-listar.component';
import { CommonModule } from '@angular/common';
import { TipoCertidaoRoutingModule } from '@pages/tipo-certidao/tipo-certidao.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TceQualificacaoProfissionalCriarComponent,
    TceQualificacaoProfissionalListarComponent,
    TceQualificacaoProfissionalEditarComponent, 
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
export class TceQualificacaoProfissionalModule {}
