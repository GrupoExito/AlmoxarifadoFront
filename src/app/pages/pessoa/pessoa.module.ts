import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { PessoaCriarComponent } from './criar/pessoa-criar.component';
import { PessoaListarComponent } from './listar/pessoa-listar.component';
import { PessoaEditarComponent } from './editar/pessoa-editar.component';
import { NgxMaskModule } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { CPFValidatorDirective } from '@pages/shared/directives/cpf.validator';

@NgModule({
  declarations: [PessoaCriarComponent, PessoaEditarComponent, PessoaListarComponent, CPFValidatorDirective],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DataTablesModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class PessoaModule {}
