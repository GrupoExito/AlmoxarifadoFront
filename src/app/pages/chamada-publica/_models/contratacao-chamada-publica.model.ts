import { Contratacao } from '@pages/contratacao/_models/contratacao.model';

export interface ContratacaoChamadaPublica extends Contratacao {
  id?: number;
  chamadapublica_id?: number;
  regime_execucao: number;
  justificativa: string;
  gcomissao_licitacao_id: number;
  gpessoa_ordenador_id: number;
  data_parecer: string;
  numero_parecer: string;
  gpessoa_responsavel_parecer_id: number;
  parecer_juridico: number;
  data_ratificacao: string;
  gpessoa_ratificador_id: number;
  glei_fundamento_id?: number;
  data_publicacao: string;
  gveiculo_publicacao_id: number;
  instrumento_convocatorio: number;
  amparo_legal: number;
  modo_disputa: number;
  orcamento_sigiloso: boolean;
  tipo_beneficio: number;
  categoria_item: number;
  sistema_registro_preco: boolean;
}
