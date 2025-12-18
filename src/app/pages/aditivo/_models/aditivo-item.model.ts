export interface AditivoItem {
  id?: number;
  aditivo_id: number;
  contrato_itens_id: number;
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
  usa_valor?: boolean;
  qtd_casas_decimais_valor?: number;
}

export interface AditivoItemEditar {
  id: number;
  percentual: number;
  quantidade: number;
}
