export interface ImpressaoDocumentoDispensa {
  impressao_id: number;
  impressao_nome: string;
  dispensa_id: number;
}

export enum DocumentoDispensa {
  'Anexo 1',
  'Termo de Referência',
  'Fornecedor x Itens',
  'Termo de Homologação',
  'Termo de Adjudicação',
  'Mapa Comparativo de Preços',
  'Parecer Contabil',
  'Parecer da Comissão',
  'Termo de Autuação',
  'Edital de Dispensa',
  'Aviso de Dispensa',
  'Reserva de Dotação',
  'Autorização de Dispensa de Licitação',
  'Parecer Agente Contratação',
  'Parecer técnico da comissão de Contratação',
  'Capa Dispensa'
}

export interface RelatorioDispensaSintetico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}

export interface RelatorioDispensaAnalitico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}
