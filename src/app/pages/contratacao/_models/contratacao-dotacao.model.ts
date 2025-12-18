export interface ContratacaoDotacao {
  id?: number;
  codigo_item_da_despesa?: string;
  contratacao_id: number;
  fonte_recurso_descricao?: string;
  fonte_recurso_id?: number;
  gdotacao_orcamentaria_id: number;
  id_fonte_recurso?: string;
  item_despesa_descricao?: string;
  item_despesa_id?: number;
  numero_projeto_atividade?: string;
  orgao_descricao?: string;
  orgao_id?: number;
  projeto_atividade_descricao?: string;
  projeto_atividade_id?: number;
  unidade_orcamentaria?: number;
  valor: string;
}
