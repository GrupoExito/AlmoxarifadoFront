export interface AnaliseRiscoHistorico {
  id?: number;
  ar_id: number;
  gusuario_id: number;
  data_historico?: string;
  historico?: string;
  flstatus_id: number;
  flsetor_id: number;
  acao_descricao?: string;
  num_dias_duracao?: number;
  setor_descricao?: string;
  status_descricao?: string;
  pendencia: boolean;
  pendencia_resolvida?: boolean;
  ar_historico_pai?: number;
  usuario_nome?: string;
}
