export interface Ata {
  id: number;
  contratacao_id: number;
  gfornecedor_id: number;
  gexercicio_id: number;
  numero: string;
  data_habilitacao: string;
  data_assinatura: string;
  data_inicial: string;
  data_final: string;
  justificativa: string;
  data_criacao: string;
  flstatus_id: number;
  flsetor_id?: number;
  fornecedor_razao_social: string;
  ata_quantidade_itens: number;
  ata_compra_valor: number;
  contratacao_numero?: number;
  contratacao_modalidade: number;
}

export interface AtaHeader {
  quantidade_item?: number;
  quantidade_historico?: number;
  quantidade_pedido_compra?: number;
  // quantidade_contratacao?: number;
  quantidade_anexo?: number;
}
