export interface ImpressaoDocumentoContrato {
  impressao_id: number;
  impressao_nome: string;
  contrato_id: number;
}

export enum DocumentoContrato {
  'Anexo Único',
  'Reserva de Dotação',
  'Imprimir Espelho do Contrato',
  'Imprimir Contrato Conforme Modelo',
}
