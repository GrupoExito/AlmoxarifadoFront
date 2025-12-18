export interface ImpressaoDocumentoInexigibilidade {
  impressao_id: number;
  impressao_nome: string;
  inexigibilidade_id: number;
}

export enum DocumentoInexigibilidade {
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
  'Autorização de inexigibilidade de licitação',
  'Reserva de Dotação',
  'C.I. da Comissão para Ass. Jurídica',
  'Capa Inexigibilidade',
  'Certificação de Inexistência de Imóveis Públicos',
  'Justificativa para Escolha do Imóvel'
}

export interface RelatorioInexigibilidadeSintetico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}

export interface RelatorioInexigibilidadeAnalitico {
  exercicio: number;
  data_inicial: string;
  data_final: string;
}
