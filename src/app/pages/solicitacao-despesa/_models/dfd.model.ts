export interface SolicitacaoDespesaDFD {
  id?: number;
  sd_id: number;
  amostra_tecnica?: boolean;
  vistoria?: boolean;
  descricao_vistoria?: string;
  resultado_esperado?: string;
  impacto_nao_contratacao?: number;
  justificativa_impacto_nao_contratacao?: string;
  contratacao_ocorrer_em?: number;
  justificar_prazo?: string;
  forma_aquisicao?: number;
  estimativa_aquisicao?: number;
  prazo_entrega_dias?: number;
  endereco_id?: number;
  horario_entrega?: string;
  prazo_execucao_servicos?: number;
  prazo_pagamento?: number;
  metodo_estimativa_preco?: number;
  responsavel_cotacao_preco?: string;
  funcao_responsavel_cotacao_preco?: string;
  fiscal_contrato_id?: number;
  funcao_fiscal_contrato?: string;
  periodo_execucao?: number;
  horario_maximo?: string;
  modelo_documento_id?: number;
}

export interface ChatGptDfd {
  ids: number[];
  objeto?: string;
}
