export interface ContratacaoLoteItem {
  id?: number;
  contratacao_id: number;
  contratacao_lote_id: number;
  sequencia?: number;
  gproduto_servico_id: number;
  quantidade: string;
  descricao?: string;
  sigla?: string;
}
