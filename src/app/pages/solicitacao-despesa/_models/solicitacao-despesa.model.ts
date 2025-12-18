export interface SolicitacaoDespesa {
  id?: number;
  processo?: number;
  gsecretaria_fundo_id: number;
  gexercicio_id: number;
  data_criacao?: string;
  data: string;
  gsetor_id: number;
  gpessoa_responsavel_id: number;
  flstatus_id: number;
  // tipo_demanda_id: string;
  tipo_objeto_id?: string;
  justificativa: string;
  objeto?: string;
  observacao?: string;
  prioridade: number;
  beneficios_esperados?: string;
  memoria_calculo?: string;
  previsao_assinatura_contrato?: string;
  prazo_entrega_dias?: string;
  responsavel_esclarescimento?: string;
  responsaveis?: number[];
  gusuario_criacao_id: number;
  ativo?: number;
  usuario_exclusao_id?: number;
  data_exclusao?: string;
  modelo_planejamento_id?: number;
  modelo_planejamento_descricao?: string;
  secretaria_fundo_descricao?: string;
  secretaria_fundo_descricao_resumida?: string;
  id_descricao?: string;
  setor_nome?: string;
  id_objeto?: string;
  sd_origem_id?: number;
  apostilamento?: boolean;
  flsetor_id?: number;
  flsetor_usuario?: number;
  pendencia?: number;
  cotacao?: any;
  local_entrega_execucao?: string;
  prazo_pagamento?: string;
  justificar_impacto?: string;
  razao_escolha?: string;
  vinculacao_dependencia?: string;
  previsao_inicio_servico?: string;
  justificar_preco?: string;
  prazo_vigencia?: string;
  indicacao_membro_planejamento?: string;
  servidor_demanda?: string;
  id_justificativa?: string;
  fiscal?: number;
  responsavel_tecnico?: number;
  previsao_pca?: string;
}

export interface DFDFiscalResponsavelTecnicoUsuario {
  id: number;
  dfd_id: number;
  usuario_id: number;
}

export class FiltrarDFD {
  usando_filtro: boolean;
  exercicio: string;
  secretaria: string;
  setor: string;
  id: string;
  produto: string;
  status: string;
  data_inicial: string;
  data_final: string;
  objeto: string;
  apostilamento: number;

  constructor() {
    this.usando_filtro = false;
    this.exercicio = '';
    this.secretaria = '';
    this.setor = '';
    this.id = '';
    this.produto = '';
    this.status = '';
    this.data_inicial = '';
    this.data_final = '';
    this.objeto = '';
    this.apostilamento = 0;
  }
}

export interface SolicitacaoDespesaSaldoApostilamento {
  id?: number;
  gproduto_servico_id?: number;
  descricao?: string;
  qtd_sd?: number;
  qtd_licitacao?: number;
  qtd_contrato?: number;
  qtd_pedido?: number;
}
