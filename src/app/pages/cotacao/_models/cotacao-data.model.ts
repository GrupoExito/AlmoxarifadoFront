import { Exercicio } from '@pages/shared/models/exercicio.model';
import { Cotacao } from './cotacao.model';

export interface COTACAOData {
  cotacao: Cotacao;
  exercicios: Exercicio[];
  permissaoStatus: number[];
  responsaveis: number[];
}
export interface COTACAODataEtapasHeader {
  quantidade_anexos: number;
  quantidade_itens: number;
  quantidade_historico: number;
  quantidade_Sd: number;
  quantidade_lote: number;
  quantidade_fornecedor: number;
}
