import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPF_CNPJPipe } from './pipes/cpf_cnpj.pipe';
import { SortByPipe } from './pipes/orderByName.pipe';
import { SituacaoSDPipe } from './pipes/situacao_sd.pipe';
import { ValorFinanceiroPipe } from './pipes/valor_financeiro.pipe';

@NgModule({
  declarations: [CPF_CNPJPipe, SortByPipe, SituacaoSDPipe, ValorFinanceiroPipe],
  imports: [CommonModule],
  exports: [CPF_CNPJPipe, SortByPipe, SituacaoSDPipe, ValorFinanceiroPipe],
})
export class SharedModule {}
