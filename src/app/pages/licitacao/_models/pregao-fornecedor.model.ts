export interface Pregao {
  id: number;
  contratacao_id: number;
  data_inicio: string;
  data_fim: string;
  hora_inicio: string;
  hora_fim: string;
  margem_preco_referencial: number;
  margem_lance_minimo: number;
  margem_lance_maximo: number;
  finalizado: boolean;
}

export interface PregaoFornecedor {
  id?: number;
  contratacao_id?: number;
  gfornecedor_id: number;
  responsavel_pregao: string;
  rg_responsavel_pregao: string;
  cpf_responsavel: string;
  tipo_empresa: string;
  seq?: number;
  habilitado: string;
  razao_social?: string;
  lote?: number;
  criterio_julgamento: number;
  cnpj_cpf?: string;
}

export interface PregaoLancePreco {
  id?: number;
  valor: string;
  criterio_julgamento?: number;
}

export interface PregaoLanceMenorValorItem {
  id: number;
  contratacao_id: number;
  gfornecedor_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  valor: string;
  marca_item: string;
  ordem: number;
  lance: number;
  vencedor: boolean;
  classificado: boolean;
  finalizado: boolean;
  observacao: string;
  observacao_item: string;
  fornecedor_id: number;
  razao_social: string;
  unidade_medida: string;
  descricao: string;
  preco_referencial: number;
  valor_inicial: number;
  lote_id: number;
  lote_descricao: string;
}

export interface ContratacaoPregaoLanceMargens {
  contratacao_id: number;
  margem: string;
  lanceMinimo: string;
  lanceMaximo: string;
}
