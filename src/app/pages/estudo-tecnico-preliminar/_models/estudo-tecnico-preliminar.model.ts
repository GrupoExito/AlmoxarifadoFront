export interface EstudoTecnicoPreliminar {
  id?: number;
  gusuario_criacao_id?: number;
  necessidade_contratacao?: string;
  requisitos_contratacao?: string;
  levantamento_mercado?: string;
  descricao_solucao?: string;
  estimativa_valor?: string;
  justificativa_parcelamento?: string;
  contratacoes_correlatas?: string;
  demonstracao_alinhamento?: string;
  resultados_pretendidos?: string;
  providencias?: string;
  impactos_ambientais?: string;
  posicionamento_conclusivo?: string;
  justificativa_tipo?: string;
  classificacao_sigilo?: string;
  numero?: string;
  responsaveis?: number[];
  responsavel_nome?: string;
  status?: number;
  status_descricao?: string;
  flsetor_id?: number;
  flstatus_id?: number;
  tipoEtp?: number;
  gexercicio_id?: number;
  diretrizes?: string;
  justificativa_necessidade?: string;
  data_etp?: string;
  certificacao_conformidade?: string;
}

export interface EstudoTecnicoPreliminarMembrosPlanejamentoUsuario {
  id: number;
  etp_id: number;
  usuario_id: number;
}
