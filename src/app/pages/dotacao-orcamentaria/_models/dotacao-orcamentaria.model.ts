export interface DotacaoOrcamentaria {
  id?: number;
  orgao_id: number;
  secretaria_fundo_id: number;
  // programa_id: number;
  projeto_atividade_id: number;
  // funcao_governo_id: number;
  // sub_funcao_governo_id: number;
  item_despesa_id: number;
  fonte_recurso_id?: number;
  fontes_recurso_ids?: number;
  valor_dotacao?: number;
  exercicio_id: number;
  programa_descricao?: string;
  funcao_descricao?: string;
  sub_funcao_descricao?: string;
  projeto_nome?: string;
  secretaria_fundo_nome?: string;
  id_secretaria_fundo_descricao?: string;
  item_da_despesa_id?: string;
  item_da_despesa_descricao?: string;
  fonte_recurso_descricao?: string;
  projeto_atividade_descricao?: string;
  numero_projeto_atividade?: string;
  orgao_descricao?: string;
  secretaria_descricao?: string;
  codigo_item_da_despesa?: string;
}
