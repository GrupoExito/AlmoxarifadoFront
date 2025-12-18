import { Contrato } from '@pages/contrato/_models/contrato.model';
import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { Aditivo } from './aditivo.model';
import { AmparoLegal } from '@pages/Amparo-Legal/_models/amparo-legal.model';

export interface AditivoData {
  aditivo: Aditivo;
  pessoa: Pessoa[];
  contrato: Contrato[];
  exercicios: Exercicio[];
  amparosLegais: AmparoLegal[];
}

export interface AditivoDataEtapasHeader {
  quantidade_anexos: number;
  quantidade_item: number;
  valor_total: number;
  quantidade_compra: number;
}
