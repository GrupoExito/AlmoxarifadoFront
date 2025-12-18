import { Contratacao } from '@pages/contratacao/_models/contratacao.model';

export interface ContratacaoLicitacao extends Contratacao {
  id?: number;
  licitacao_id?: number;
  contratacao_id?: number;
  criterio_julgamento_descricao?: string;
  forma_conducao?: number;
  modalidade_descricao?: string;
  registro_preco?: number;
  gcomissao_licitacao_id?: number;
  gpessoa_ordenador_id: number;
  margem_preco_referencial?: string;
  margem_lance_minimo?: string;
  margem_lance_maximo?: string;
  status_descricao?: string;
  valor_total?: number;
  instrumento_convocatorio: number;
  amparo_legal: number;
  modo_disputa: number;
  orcamento_sigiloso: boolean;
  tipo_beneficio: number;
  categoria_item: number;
  sistema_registro_preco: boolean;
  finalizado?: boolean;
  justificativa_presencial?: string;
 }

export interface ListarContratosFornecedor {
  contrato_id: number;
  gfornecedor_id: number;
  numero: number;
  gexercicio_id: number;
  data_inicio: string;
  data_final: string;
  objeto: string;
  valor: number;
  controle: number;
  flstatus_id: number;
}
