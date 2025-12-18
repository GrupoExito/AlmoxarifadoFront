export interface PcaSimplificadoHistorico {
  id?: number;
  pca_simplificado_id: number;
  gusuario_id: number;
  data_historico?: string;
  historico?: string;
  acao_descricao?: string;
  num_dias_duracao?: number;
  pendencia: boolean;
  pendencia_resolvida?: boolean;
  usuario_nome?: string;
}
