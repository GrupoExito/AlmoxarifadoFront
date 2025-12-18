import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DataTablesModule } from 'angular-datatables';
import { EnderecoCriarComponent } from './criar/endereco-criar.component';
import { EnderecoListarComponent } from './listar/endereco-listar.component';
import { EnderecoRoutingModule } from './endereco.routing.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [EnderecoCriarComponent, EnderecoListarComponent],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    DataTablesModule,
  ],
  exports: [EnderecoCriarComponent]
})
export class EnderecoModule {}
