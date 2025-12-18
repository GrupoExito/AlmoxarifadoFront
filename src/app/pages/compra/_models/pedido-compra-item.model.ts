export interface PedidoCompraItem {
  id: number;
  pedido_compra_id: number;
  gfornecedor_id: number;
  gproduto_servico_id: number;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  sd_id: number;
  quantidade: number;
  valor: number;
  percent_desconto: number;
  item_descricao?: string;
  unidade_medida_descricao?: string;
  razao_social?: string;
  valor_corrigido_decimal?: number;
  descricao_lote?: string;
}

export interface ListaPedidoCompraItemContrato {
  contrato_id: number;
  sd_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  valor: number;
  gfornecedor_id: number;
  contratacao_id: number;
  gexercicio_id: number;
  gsecretaria_fundo_id: number;
  descricao_produto: string;
  fornecedor_nome: string;
  unidade_medida_descricao: string;
  secretaria_descricao: string;
  lote_descricao: string;
  secretaria_sigla: string;
}

export interface ListaPedidoCompraItemContratoSimplificado {
  contrato_id: number;
  contratacao_id: number;
  sd_id: number;
  gexercicio_id: number;
  gfornecedor_id: number;
  data_fim: string;
  gproduto_servico_id: number;
  descricao: string;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  sigla: string;
  fornecedor_nome: string;
  secretaria_descricao: string;
  sigla_secretaria: string;
  quantidade: number;
  valor: number;
  quantidade_total: number;
  aditivo_data: string;
  aditivo_valor: number;
  aditivo_quantidade: number;
  pedido_quantidade: number;
  quantidade_adicionada: number;
  valor_adicionada: number;
  descricao_lote: string;
}

export interface ListaPedidoCompraItemDFDSimplificado {
  sd_id: number;
  contratacao_id: number;
  gfornecedor_id: number;
  sd_gexercicio_id: number;
  gproduto_servico_id: number;
  descricao_produto: string;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  sigla: string;
  fornecedor_nome: string;
  secretaria_descricao: string;
  quantidade_contratacao: number;
  quantidade_compra: number;
  quantidade_contrato: number;
  aditivo_contratacao_quantidade: number;
  contratacao_valor: number;
  quantidade_adicionada: number;
  quantidade: number;
  descricao_lote: string;
  data_ata_inicial?: string;
  data_ata_final?: string;
}

export interface ListaPedidoCompraItemAtaSimplificado {
  ata_id: number;
  contratacao_id: number;
  sd_id: number;
  gexercicio_id: number;
  gfornecedor_id: number;
  data_final: string;
  gproduto_servico_id: number;
  descricao: string;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  sigla: string;
  fornecedor_nome: string;
  secretaria_descricao: string;
  sigla_secretaria: string;
  quantidade: number;
  valor: number;
  valor_total: number;
  aditivo_data: string;
  aditivo_valor: number;
  aditivo_quantidade: number;
  pedido_quantidade: number;
  quantidade_adicionada: number;
  valor_adicionada: number;
  descricao_lote: string;
}

export interface ListaPedidoCompraItemSD {
  sd_id: number;
  secretaria_descricao: string;
  secretaria_sigla: string;
  contratacao_id: number;
  descricao_produto: string;
  gproduto_servico_id: number;
  unidade_medida_descricao: string;
  gfornecedor_id: number;
  fornecedor_nome: string;
  gexercicio_id: number;
  quantidade: number;
  valor: number;
}

export interface PedidoCompraItemQuantidade {
  quantidade_licitada?: number;
  quantidade_total_contratada?: number;
  quantidade_contrato?: number;
  quantidade_aditivada?: number;
  valor_aditivada?: number;
  data_aditivada?: string;
  aditivado?: boolean;
  quantidade_comprada?: number;
  quantidade_expirada?: number;
  quantidade_permitida?: number;
  data_fim?: string;
}

export interface PedidoCompraItemQuantidadeDFD {
  quantidade_licitada?: number;
  quantidade_total_contratada?: number;
  quantidade_comprada?: number;
  quantidade_contratacao?: number;
  quantidade_contrato?: number;
  quantidade_expirada?: number;
  quantidade_permitida?: number;
  quantidade_aditivada?: number;
  quantidade_dfd?: number;
  data_fim?: string;
}

export interface PedidoCompraAnexo {
  id: number;
  pedido_compra_id: number;
  nome_arquivo: string;
  path_file: string;
  descricao_documento: string;
}
