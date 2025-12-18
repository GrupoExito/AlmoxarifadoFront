export interface RelatorioSDPorSecretaria {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  setor: string;
  setor_selecionados: number[];
}

export interface RelatorioSDPorStatus {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
}

export interface RelatorioSDResumida {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionadas: number[];
  status_selecionados: number[];
}

export interface RelatorioSDDetalhada {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionadas: number[];
}

export interface ImpressaoDocumentoSD {
  impressao_id: number;
  impressao_nome: string;
  sd_id: number;
}

export enum DocumentoSD {
  'DFD',
  'Folha de Rosto',
  'PRDC',
}

export interface ImpressaoDocumentoContrato {
  impressao_id: number;
  impressao_nome: string;
  contrato_id: number;
}

export interface RelatorioContratoSintetico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  data_vencimento?: string;
  fornecedor: string;
  fornecedor_selecionados: number[];
}

export interface RelatorioContratoAnalitico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  data_vencimento?: string;
  fornecedor: string;
  fornecedor_selecionados: number[];
}

export interface RelatorioContratoAditivo {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  data_vencimento?: string;
  fornecedor: string;
  fornecedor_selecionados: number[];
}

export interface ImpressaoDocumentoFornecedor {
  fornecedor_id: number;
}
