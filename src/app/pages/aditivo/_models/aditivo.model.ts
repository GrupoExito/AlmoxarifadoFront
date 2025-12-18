export interface Aditivo {
  id: number;
  contrato_id: number;
  data_criacao: string;
  gusuario_criacao_id: number;
  data_solicitacao: string;
  gpessoa_solicitante_id: number;
  data_aprovacao: number;
  gusuario_aprovacao_id: number;
  data_validade: string;
  objeto: string;
  justificativa: string;
  aditivo_data: boolean;
  reajuste_valor: boolean;
  qualificacao_acrescimo_supressao: boolean;
  aditivo_renovacao: boolean;
  flstatus_id: number;
  data_cancelamento: string;
  gusuario_cancelamento_id: number;
  motivo_cancelamento: string;
  numero_contrato?: string;
  gexercicio_id?: string;
  fornecedor?: string;
  data_publicacao?: string;
  data_inicio?: string;
  tipo_aditivo_contrato?: number;
  usa_data_validade?: boolean;
  sequencial_aditivo: number;
  id_aditivo_pncp?: number;
  exercicio_contrato?: number;
  id_contrato_pncp?: number;
  valor?: number;
  numero?: string;
  exame_previo: boolean;
  amparo_legal_id?: number;
  fundamentacao_legal_aditivo?: string;
}

export interface AditivoItemAdicionarTodos {
  aditivo_id: number;
  contrato_id: number;
  percentual: number;
}

export interface ImpressaoDocumentoAditivo {
  impressao_id: number;
  impressao_nome: string;
  aditivo_id: number;
}

export enum DocumentoAditivo {
  'Folha de Rosto do Aditivo',
  'DFD do Aditivo',
  'Autorização do Aditivo',
  'Reserva de Dotação',
}
