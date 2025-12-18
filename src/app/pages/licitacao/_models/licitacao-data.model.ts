import { ContratacaoLicitacao } from './contratacao-licitacao.model';

export interface LicitacaoData {
  licitacao: ContratacaoLicitacao;
  usaLote: boolean;
  pregao: boolean;
  permissaoStatus: number[];
}
