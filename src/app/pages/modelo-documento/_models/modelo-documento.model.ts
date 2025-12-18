export interface ModeloDocumento {
  id?: number;
  descricao: string;
  tipo: string;
  modelo: string;
  campos?: string;
  colunas?: ModeloDocumentoColuna[];
}

export interface ModeloDocumentoColuna {
  nomeBanco: string;
  nomePdf: string;
}

export enum TipoModelo {
  'Selecione um Modelo',
  'Modelo de TR',
  'Modelo de Notificação',
  'Modelo de Documentos',
  'Modelo de SD',
  'Modelo de Processo Adm',
  'Modelo de Despacho',
  'Modelo de Pedido de Compra',
  'Modelo de Termo de Dispensa',
  'Modelo de Termo de Inexigibilidade',
}
