export interface ImpressaoDocumentoCredenciamento {
  impressao_id: number;
  impressao_nome: string;
  credenciamento_id: number;
}

export enum DocumentoCredenciamento {
  'Anexo 1',
  'Termo de Referência',
  'Fornecedor x Itens',
  'Termo de Homologação',
  'Termo de Adjudicação',
  'Parecer Contábil',
  'Parecer da Comissão',
  'Termo de Autuação do Processo',
  'Parecer Agente Contratação',
  'Parecer técnico da comissão de Contratação',
  'Autorização de Credenciamento de licitação',
  'Reserva de Dotação',
  'C.I. da Comissão para Ass. Jurídica',
  'Capa Credenciamento'
}

export interface RelatorioCredenciamentoSintetico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}

export interface RelatorioCredenciamentoAnalitico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}
