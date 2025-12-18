export interface CotacaoLoteItem {
  id?: number;
  cotacao_id: number;
  cotacao_lote_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  codigo_produto?: string;
  descricao_produto?: string;
  unidade_medida?: string;
}
