export interface FiltroRelatorioDTO {
  id?: number;
  almoxarifado?: number;
  almoxarifado_selecionado?: number[];
  secretaria?: number;
  secretaria_selecionadas?: number[];
  fornecedor?: number;
  fornecedor_selecionado?: number[];
  produtoServico?: number;
  produtoServico_selecionado?: number[];
  //status_entrada?: string;
  //tipo_entrada_material?: string;
  data_inicial?: string;
  data_final?: string;
  //produto_id?: number;
  //produto_selecionado?: number[];
  tipo_produto?: number;
  tipo_produto_selecionado?: number[];
  setor?: number;
  setor_selecionado?: number[];
}

export enum DocumentoEntrada {
  'Relatório de Movimentação de Material',
}
/*
export interface RelatorioMovimentacaoEntrada {
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  secretaria: string;
  secretaria_selecionadas: number[];
  fornecedor: string;
  fornecedor_selecionado: number[];
  produtoServico: string;
  produtoServico_selecionado: number[];
  status_entrada?: string;
  tipo_entrada_material?: string;
  data_inicial: string;
  data_final: string;
}*/

/*
export interface RelatorioMovimentacaoEntradaPorItem {
  data_inicial: string;
  data_final: string;
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  produto: string;
  produto_selecionado: number[];
  tipo_produto: string;
  tipo_produto_selecionado: number[];
}
*/