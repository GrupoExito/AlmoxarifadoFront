export interface TermoReferenciaHistorico {
  id?: number;
  termo_referencia_id?: number;
  gusuario_id?: number;
  data_historico?: string;
  historico?: string;
  flstatus_id?: number;
  flsetor_id?: number;
  pendencia?: boolean;
  pendencia_resolvida?: boolean;
  tr_historico_pai?: number;
  status_descricao?: string;
  setor_descricao?: string;
  usuario_nome?: string;
}
