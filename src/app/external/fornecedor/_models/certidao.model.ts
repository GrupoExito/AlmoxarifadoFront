export interface FornecedorCertidao {
  id?: number;
  fornecedor_id: number;
  tipo_certidao_id: number;
  numero: string;
  data_emissao: string;
  data_validade: string;
  tipo_certidao_descricao?: string;
}
