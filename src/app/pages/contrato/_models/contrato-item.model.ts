export interface ContratoItem {
  id?: number;
  contrato_id: number;
  sd_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  valor: number;
  descricao_item?: string;
  descricao_secretaria?: string;
  unidade_medida?: string;
  item_unidade_medida?: string;
  valor_total_aditivo?: number;
  quant_aditivo: number;
  valor_aditivo_item: number;
  qtd_pedido?: number;
}

export interface ContratoItemVencedores {
  gfornecedor_id: number;
  secretaria_descricao: string;
  secretaria_id: number;
  codigo: number;
  descricao_item: string;
  descricao_lote?: string;
  unidade_medida_id: number;
  quantidade_licitada: number;
  quantidade_disponivel: number;
  quantidade_contratada_contrato: number;
  quantidade_contratada_sd: number;
  quantidade_fornecedor_venceu: number;
  quantidade_contratada_contratacao: number;
  valor: number;
  cod_produto: number;
  cod_produto_inserido_contrato: number;
  sd_id: number;
  gexercicio_id: number;
  unidade_medida_descricao: string;
}
