export interface EntradaMaterialItem {
  id?: number;
  entrada_id?: number;
  produto_servico_id?: number;
  quantidade?: number;
  valor_unitario?: number;
  valor_total?: number;
  data_validade?: string;
  lote?: string;
  item_descricao?: string;
  codigo_itens?: string;
  und_descricao?: String
  nota?: String
  data_nota?: string;
  fornecedor_id?: number;
  fracionado?: boolean;
  quantidade_fracionada?: number;
  unidade_medida_fracionada_id?: number;
}

export interface EntradaMaterialItemSaldo {
  id?: number;
  entrada_id?: number;
  produto_servico_id?: number;
  quantidade?: number;
  valor_unitario?: number;
  valor_total?: number;
  data_validade?: string;
  lote?: string;
  item_descricao?: string;
  codigo_itens?: string;
  und_descricao?: String
  nota?: String
  data_nota?: string;
  fornecedor_id?: number;
  fracionado?: boolean;
  quantidade_fracionada?: number;
  unidade_medida_fracionada_id?: number;
}