export interface PcaSimplificado {
  id?: number;
  gusuario_criacao_id?: number;
  gexercicio_id?: number;
  gsecretaria_fundo_id?: number;
  justificativa_necessidade: string;
  exercicio?: string;
  secretaria?: string;
  // secretaria_descricao?: string;
}

export interface PcaSimplificadoObjeto {
  id?: number;
  pca_simplificado_id?: number;
  pca_simplificado_objeto_id?: number;
  valor_unitario?: number;
  data_desejada?: string;
  descricao?: string;
  categoria_item_pca?: number;
  classificacao_catalogo?: number;
}

export interface PcaObjeto {
  id?: number;
  descricao?: number;
}
