export interface CotacaoFornecedorItem {
  id: number;
  cotacao_id: number;
  gexercicio_id: number;
  gfornecedor_id: number;
  cotacao_lote_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  valor: number;
  marca_item: string;
  item_descricao?: string;
  unidade_medida_descricao?: string;
  fornecedor_descricao?: string;
  fornecedor_endereco?: string;
  fornecedor_cnpj?: string;
  descricao_lote?: string;
  uuid?: string;
  flstatus_id?: number;
}

export interface CotacaoFornecedorItemPreco {
  id: number;
  valor: string;
  marca_item?: string;
}

export interface CotacaoFornecedorItemPrecoPorLink {
  uuid: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  cotacaoFornecedorItemPreco: CotacaoFornecedorItemPreco[];
}

export interface CotacaoFornecedorSaldoPorLote {
  fornecedor?: string;
  total?: number;
  id_lote?: number;
  descricao_lote?: string;
  total_geral?: number;
}
