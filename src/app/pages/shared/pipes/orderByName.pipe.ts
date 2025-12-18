import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    } // no array
    if (value.length <= 1) {
      return value;
    } // array with only one item
    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      } else {
        return value.sort().reverse();
      }
    } // sort 1d array
    return orderBy(value, [column], [this.returnType(order)]);
  }

  returnType(order = ''): ordenacao {
    if (order == 'asc') {
      return 'asc';
    } else {
      return 'desc';
    }
  }
}

type ordenacao = 'asc' | 'desc';
