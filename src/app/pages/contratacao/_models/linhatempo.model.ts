export interface LinhaTempoAno {
  ano: number;
  meses: LinhaTempoMes[];
}

export interface LinhaTempoMes {
  mes: number;
  dias: LinhaTempoDia[];
}

export interface LinhaTempoDia {
  dia: number;
  historicos: ContratacaoHistoricoLinhaTempo[];
}

export interface ContratacaoHistoricoLinhaTempo {
  data_historico: string;
  flstatus_id: number;
  flsetor_id: number;
  gusuario_id: number;
  historico: string;
  pendencia: boolean;
  pendencia_resolvida: boolean;
  setor: string;
  status: string;
  usuario_nome: string;

  id: number;
  processo_id: number;
  processo_nome: string;
  historico_pai?: number;
}

export interface LinhaProcesso {
  lista_dfd: ContratacaoHistoricoLinhaProcessoDFD[];
  dfd?: ContratacaoHistoricoLinhaProcessoDFD;
  pad?: ContratacaoHistoricoLinhaProcessoPAD;
  contratacao: ContratacaoHistoricoLinhaProcessoContratacao;
}
export interface ContratacaoHistoricoLinhaProcessoDFD {
  data_inicial: string;
  data_final: string;
  dias: string;
  sd_id: number;
}

export interface ContratacaoHistoricoLinhaProcessoPAD {
  data_inicial: string;
  data_final: string;
  dias: string;
  processo_adm_id: number;
}

export interface ContratacaoHistoricoLinhaProcessoContratacao {
  data_inicial: string;
  data_final: string;
  dias: string;
  contratacao_id: number;
  modalidade_compra_id: number;
}
