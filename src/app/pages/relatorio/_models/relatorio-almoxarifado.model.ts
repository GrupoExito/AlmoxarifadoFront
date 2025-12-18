export interface RelatorioTransferenciaMaterial {
  almoxarifado: string;
  almoxarifado_selecionado: number[];
  secretaria: string;
  secretaria_selecionadas: number[];
  setor: string;
  setor_selecionado: number[];
  produtoServico: string;
  produtoServico_selecionado: number[];
  tipo_entrada_material?: string;
  data_inicial: string;
  data_final: string;
}

export interface RelatorioMaterialEstoque {
  almoxarifado: string;
  almoxarifado_selecionado?: number[];
  produto?: string;
  produto_selecionado?: number[];
  data_inicial?: string;
  data_final?: string;
  tipo_produto: string;
  tipo_produto_selecionado: number[];
}

export interface RelatorioBalanceteEstoque {
  almoxarifado: string;
  almoxarifado_selecionado?: number[];
  produto?: string;
  produto_selecionado?: number[];
  tipo_produto?: string;
  tipo_produto_selecionado?: number[];
  data_inicial?: string;
  data_final?: string;
}

export interface ExtratoMovimentacao {
  almoxarifado_id: number;
  almoxarifado_selecionado?: number;
  produto_id: number;
  produto_selecionado?: number;
  data_inicial?: string;
  data_final?: string;
}

export interface RelatorioMaterialEstoqueSecretaria {
  secretaria: string;
  secretaria_selecionadas: number[];
  produto: string;
  produto_selecionado: number[];
  data_inicial: string | null;
  data_final: string | null;
  almoxarifado: string,
  almoxarifado_selecionado: number[];
}