import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valor_financeiro',
})
export class ValorFinanceiroPipe implements PipeTransform {
  transform(value: string): any {
    return value.toString().replace('.', ',');
  }
}
