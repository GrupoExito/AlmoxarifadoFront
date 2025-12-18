export interface ImpressaoDocumentoLicitacao {
  impressao_id: number;
  impressao_nome: string;
  licitacao_id: number;
}

export enum DocumentoLicitacao {
  'Anexo 1',
  'Termo de Referência',
  'Fornecedor x Itens',
  'Quantitativo Consolidado',
  'Licitado x Cotado',
  'Autuação',
  'Termo de Homologação',
  'Termo de Adjudicação',
  'Parecer Contábil',
  'Parecer da Comissão',
  'Mapa Comparativo de Preços',
  'Reserva de Dotação',
}

export interface RelatorioLicitacaoSintetico {
  exercicio: number;
  modalidade: string;
  modalidade_selecionado: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
}

export interface RelatorioLicitacaoModalidade {
  exercicio: number;
  modalidade: string;
  modalidade_selecionado: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
}

export interface RelatorioLicitacaoFornecedor {
  exercicio: number;
  modalidade: string;
  modalidade_selecionado: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
}

export interface RelatorioLicitacaoAnalitico {
  exercicio: number;
  modalidade: string;
  modalidade_selecionado: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
}

export interface RelatorioLicitacaoFornecedorAnalitico {
  exercicio: number;
  modalidade: string;
  modalidade_selecionado: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
}
