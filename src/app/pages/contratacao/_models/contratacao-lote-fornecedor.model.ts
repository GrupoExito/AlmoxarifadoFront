export interface ContratacaoLoteFornecedor {
  id?: number;
  contratacao_id: number;
  contratacao_lote_id?: number;
  gfornecedor_id: number;
  data_habilitacao?: string;
  desclassificado: boolean;
  motivo_desclassificacao?: string;
  justificativa?: string;
  numero_ata?: string;
  data_desclassificacao?: string;
  data_credenciamento?: string;
  num_credenciamento?: string;
  descricao?: string;
  data_assinatura_ata?: string;
  data_ata_inicial?: string;
  data_ata_final?: string;
  contratacao_lote_id_parcial?: number[];
}
