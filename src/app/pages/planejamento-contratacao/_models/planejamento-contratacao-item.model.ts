export interface PlanejamentoContratacaoItem {
  id?: number;
  pca_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  data_criacao?: Date;
  valor_estimado?: number;
}

export interface ProdutoImportacao {
  descricao: string;
  unidade_medida_sigla: string;
  quantidade: string;
  marca: string;
  valor: string;
}
