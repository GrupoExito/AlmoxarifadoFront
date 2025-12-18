export interface AditivoHistorico {
  id?: number;
  aditivo_id: number;
  gusuario_id: number;
  data_historico?: string;
  historico?: string;
  flstatus_id: number;
  flsetor_id?: number;
  pendencia: boolean;
  pendencia_resolvida?: boolean;
  aditivo_historico_pai?: number;
  acao_descricao?: string;
  num_dias_duracao?: number;
  setor_descricao?: string;
  status_descricao?: string;
  usuario_nome?: string;
}
