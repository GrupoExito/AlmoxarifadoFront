import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf_cnpj',
})
export class CPF_CNPJPipe implements PipeTransform {
  transform(CPF_CNPJ: any) {
    if (CPF_CNPJ && CPF_CNPJ.length == 11) {
      return CPF_CNPJ.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    } else if (CPF_CNPJ && CPF_CNPJ.length == 14) {
      return CPF_CNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
    }
  }
}
