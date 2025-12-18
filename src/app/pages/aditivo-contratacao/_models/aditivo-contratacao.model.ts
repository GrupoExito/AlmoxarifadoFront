export interface AditivoContratacao {
  id: number;
  contratacao_id: number;
  data_criacao: string;
  gusuario_criacao_id: number;
  data_solicitacao: string;
  gpessoa_solicitante_id: number;
  data_aprovacao: string;
  gusuario_aprovacao_id: number;
  data_validade: string;
  objeto: string;
  justificativa: string;
  flstatus_id: number;
  data_cancelamento: string;
  gusuario_cancelamento_id: number;
  motivo_cancelamento: string;
  reajuste_valor: boolean;
  aditivo_data: boolean;
  qualificacao_acrescimo_supressao: boolean;
  gexercicio_id?: string;
  numero_contratacao?: string;
  fornecedor?: string;
  data_publicacao: string;
  data_inicio: string;
}

export interface ImpressaoDocumentoContratacaoAditivo {
  impressao_id: number;
  impressao_nome: string;
  aditivo_contratacao_id: number;
}

export enum DocumentoAditivoContratacao {
  'Folha de Rosto do Aditivo',
  'DFD do Aditivo',
  'Autorização do Aditivo',
  'Reserva de Dotação',
}
