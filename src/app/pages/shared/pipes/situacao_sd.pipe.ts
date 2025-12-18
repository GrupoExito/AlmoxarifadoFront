import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/fluxo.model';

@Pipe({
  name: 'situacao_sd',
})
export class SituacaoSDPipe implements PipeTransform {
  transform(value: number): any {
    return Object.values(Status)[value - 1];
  }
}
