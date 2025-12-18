export interface PlanejamentoContratacaoDotacao {
  id?: number;
  pca_id: number;
  gdotacao_orcamentaria_id: number;
  projeto_atividade_id?: number;
  projeto_atividade_descricao?: string;
  item_despesa_id?: number;
  item_despesa_descricao?: string;
  fonte_recurso_id?: number;
  fonte_recurso_descricao?: string;
  id_fonte_recurso?: string;
  orgao_id?: number;
  orgao_descricao?: string;
  numero_projeto_atividade?: string;
  codigo_item_da_despesa?: string;
  valor?: number;
}
