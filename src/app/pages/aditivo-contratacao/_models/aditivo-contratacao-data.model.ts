import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { AditivoContratacao } from './aditivo-contratacao.model';
import { Contratacao } from '@pages/contratacao/_models/contratacao.model';

export interface AditivoContratacaoData {
  aditivoContratacao: AditivoContratacao;
  pessoa: Pessoa[];
  contratacao: Contratacao[];
  exercicios: Exercicio[];
}

export interface AditivoContratacaoDataEtapasHeader {
  quantidade_anexos: number;
  quantidade_item: number;
  valor_total: number;
}
