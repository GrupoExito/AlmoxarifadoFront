export interface SolicitacaoDespesaItens {
  id?: number;
  sd_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  justificativa_item?: string;
  destinacao_item?: string;
  marca?: string;
  lote?: number;
  item_descricao?: string;
  unidade_medida_descricao?: string;
  id_descricao?: string;
}

export interface ProdutoImportacao {
  produto_id: string;
  descricao: string;
  unidade_medida_sigla: string;
  quantidade: string;
  marca: string;
  valor: string;
  lote: string;
}
