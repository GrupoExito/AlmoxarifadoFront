export interface ContratacaoLoteFornecedorItem {
  id?: number;
  contratacao_id: number;
  contratacao_lote_id: number;
  contratacao_lote_fornecedor_id: number;
  contratacao_lote_itens_id: number;
  quantidade: number;
  valor: number;
  vencedor: boolean;
  desclassificado: boolean;
  data_desclassificacao: string;
  motivo_desclassificacao: string;
  marca_item: string;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  fornecedor_descricao?: string;
  codigo_item?: string;
  item_descricao?: string;
  unidade_medida_descricao?: string;
  descricao_lote?: string;
  gfornecedor_id?: number;
  valor_total: number;
  descricao?: string;
  razao_social?: number;
  quantidade_disponivel?: number;
  valor_vencedor?: number;
  quantidade_itens_vencedor?: number;
}

export interface ContratacaoFornecedorItemPreco {
  id?: number;
  contratacao_id: number;
  valor?: string;
  marca_item?: string;
  quantidade?: string;
  codigo_item?: string;
}

export interface ContratacaoFornecedorItemDesclassficado {
  id: number;
  desclassificado: boolean;
}

export interface ContratacaoFornecedorItemAtualizarResultado {
  contratacao_id: number;
  criterio_julgamento: number;
}
