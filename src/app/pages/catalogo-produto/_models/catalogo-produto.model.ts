export interface CatalogoProduto {
  id?: number;
  descricao: string;
  unidade_medida_id: number;
  valor_referencia: number;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  tipo_de_produto_servico_id: number;
  usadataValidade?: boolean;
  ativo?: boolean;
  usuario_exclusao_id?: number;
  data_exclusao?: string;

  quantidade_total?: number;
  unidade_medida_descricao?: string;
  unidade_medida_sigla?: string;
  tipo_produto_descricao?: string;
}

export interface ResImagemCatalogoProduto {
  quantidade_imagem: number;
  imagem: ImagemCatalogoProduto[];
}

export interface ImagemCatalogoProduto {
  bytes: Blob;
  mimetype: string;
  name: string;
  size: number;
  id: number;
}
