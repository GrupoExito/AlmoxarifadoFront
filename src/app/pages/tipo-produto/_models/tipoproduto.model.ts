export interface TipoProduto {
  id: number;
  descricao: string;
  servicoMaterial: number;
  tipo_descricao?: string;
}

export interface CriarTipoProduto {
  descricao: string;
  servicoMaterial: number;
}
