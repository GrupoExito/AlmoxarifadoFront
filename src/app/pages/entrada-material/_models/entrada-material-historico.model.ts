export interface EntradaMaterialHistorico {
  id?: number;
  entrada_id: number;
  gusuario_id: number;
  data_historico?: string;
  historico?: string;
  flstatus_id: number;
  acao_descricao?: string;
  status_descricao?: string;
  nome_usuario?: string;
}
