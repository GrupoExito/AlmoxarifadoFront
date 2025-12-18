export interface CotacaoSolicitacaoDespesa {
  id?: number;
  cotacao_id: number;
  sd_id: number;
  secretaria_descricao?: string;
  gexercicio_id?: number;
  objeto_sd?: string;
  qtd_item_sd?: number;
}
