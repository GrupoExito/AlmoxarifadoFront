export interface CotacaoItem {
  id?: number;
  cotacao_id: number;
  gexercicio_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  codigo_item?: string;
  descricao_produto?: string;
  unidade_medida?: string;
  sequencial?: number;
}
