export interface AnaliseRisco {
  id?: number;
  gusuario_criacao_id?: number;
  planejamento_probabilidade?: number;
  planejamento_impacto?: number;
  fornecedor_probabilidade?: number;
  fornecedor_impacto?: number;
  contratacao_probabilidade?: number;
  contratacao_impacto?: number;
  status_descricao?: string;
  etp_id?: number;
  responsaveis?: string;
  flsetor_id?: number;
  flstatus_id?: number;
}
