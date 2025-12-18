import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComissaoLicitacaoMembrosListarComponent } from './listar/comissao-licitacao-membros-listar.component';
import { ComissaoLicitacaoMembrosRoutingModule } from './comissao-licitacao-membros.routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ComissaoLicitacaoMembrosCriarComponent } from './criar/comissao-licitacao-membros-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComissaoLicitacaoMembrosEditarComponent } from './editar/comissao-licitacao-membros-editar.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ComissaoLicitacaoMembrosCriarComponent,
    ComissaoLicitacaoMembrosEditarComponent,
    ComissaoLicitacaoMembrosListarComponent,
  ],
  imports: [
    CommonModule,
    ComissaoLicitacaoMembrosRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
  ],
})
export class ComissaoLicitacaoMembrosModule {}
