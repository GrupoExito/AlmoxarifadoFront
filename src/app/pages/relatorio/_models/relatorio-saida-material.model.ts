export interface ImpressaoDocumentoSaida {
  impressao_id: number;
  impressao_nome: string;
  saida_id: number;
}

export enum DocumentoSaida {
  'Relatório de Movimentação de Material',
}

export interface RelatorioMovimentacaoSaida {
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  secretaria: string;
  secretaria_selecionadas: number[];
  setor: string;
  setor_selecionado: number[];
  produto: string;
  produto_selecionado: number[];
  status_entrada?: string;
  tipo_saida_material?: string;
  data_inicial: string;
  data_final: string;
  tipo_produto: string;
  tipo_produto_selecionado: number[];
}

export interface RelatorioMovimentacaoSaidaPorCidadao {
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  secretaria: string;
  secretaria_selecionadas: number[];
  produto: string;
  produto_selecionado: number[];
  cidadao: string;
  cidadao_selecionado: number[];
  status_entrada?: string;
  tipo_saida_material?: string;
  data_inicial: string;
  data_final: string;
  tipo_produto: string;
  tipo_produto_selecionado: number[];
}

export interface RelatorioMovimentacaoSaidaPorItem {
  data_inicial: string;
  data_final: string;
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  produto: string;
  produto_selecionado: number[];
  tipo_produto: string;
  tipo_produto_selecionado: number[];
}
