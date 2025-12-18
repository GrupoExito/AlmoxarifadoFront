export interface ModeloPlanejamentoProduto {
  id?: number;
  modelo_planejamento_id: number;
  modelo_planejamento_descricao?: string;
  produto_servico_id: number;
  produto_servico_descricao?: string;
  quantidade: number;
  unidade_medida?: string;
}
