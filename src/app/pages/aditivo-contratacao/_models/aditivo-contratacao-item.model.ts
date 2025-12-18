export interface AditivoContratacaoItem {
  id?: number;
  aditivo_contratacao_id: number;
  codigo_item?: number;
  contratacao_lote_fornecedor_itens_id: number;
  percentual: number;
  quantidade: number;
  valor: number;
  descricao_item?: string;
  valor_total_contratado?: number;
  quantidade_contratada?: number;
  item_unidade_medida?: string;
  descricao_secretaria?: string;
  dfd_item_unidade_medida?: string;
  unidade_medida?: string;
  sd_id?: number;
  secretaria_sigla?: string;
  secretaria_id?: number;
  quantidade_contratacao?: number;
  valor_contratacao?: number;
}
