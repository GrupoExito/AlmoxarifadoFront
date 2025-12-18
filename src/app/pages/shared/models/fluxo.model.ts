export interface Fluxo {
  gusuario_id: number;
  observacao: string;
  status_id?: number;
  setor_id?: number;
  entidade: FluxoEntidade;
  pendencia: boolean;
  pendencia_resolvida?: boolean;
}

export enum FluxoEntidade {
  'DFD' = 'DFD',
  'Cotacao' = 'Cotacao',
  'Contratacao' = 'Contratacao',
  'Contrato' = 'Contrato',
  'Ata' = 'Ata',
  'Aditivo' = 'Aditivo',
  'AditivoContratacao' = 'AditivoContratacao',
  'PedidoCompra' = 'PedidoCompra',
  'ProcessoAdministrativo' = 'ProcessoAdministrativo',
  'PlanejamentoContratacao' = 'PlanejamentoContratacao',
  'AnaliseRisco' = 'AnaliseRisco',
  'EstudoTecnicoPreliminar' = 'EstudoTecnicoPreliminar',
  'TermoReferencia' = 'TermoReferencia',
}

export interface FluxoDFD extends Fluxo {
  sd_id: number;
  sd_historico_pai?: number;
}

export interface FluxoCotacao extends Fluxo {
  cotacao_id: number;
  cotacao_historico_pai?: number;
}

export interface FluxoContratacao extends Fluxo {
  contratacao_id: number;
  contratacao_historico_pai?: number;
}

export interface FluxoContrato extends Fluxo {
  contrato_id: number;
  contrato_historico_pai?: number;
}

export interface FluxoAta extends Fluxo {
  ata_id: number;
  ata_historico_pai?: number;
}

export interface FluxoProcessoAdm extends Fluxo {
  processo_adm_id: number;
  processo_adm_historico_pai?: number;
}

export interface FluxoTermoReferencia extends Fluxo {
  termo_referencia_id: number;
  tr_historico_pai?: number;
}

export interface FluxoPCA extends Fluxo {
  pca_unificado_id: number;
  pca_unificado_historico_pai?: number;
}

export interface FluxoETP extends Fluxo {
  etp_id: number;
  etp_historico_pai?: number;
}

export interface FluxoAR extends Fluxo {
  ar_id: number;
  ar_historico_pai?: number;
}

export interface FluxoAditivo extends Fluxo {
  aditivo_id: number;
  aditivo_historico_pai?: number;
}

export interface FluxoPedidoCompra extends Fluxo {
  pedido_compra_id: number;
  pedido_compra_historico_pai?: number;
}

export interface StatusFluxo {
  id?: number;
  descricao: string;
}

export interface SetorFluxo {
  id?: number;
  nome: string;
}

export enum Status {
  'Aberto' = 1,
  'Autorizado' = 2,
  'Embargado' = 3,
  'Cotado' = 4,
  'Processando' = 5,
  'Publicado' = 6,
  'Licitado' = 7,
  'Em Análise' = 8,
  'Cotando' = 9,
  'Enviado para Licitação' = 10,
  'Homologado' = 11,
  'Cancelado' = 12,
  'Confirmado' = 13,
  'Extornado' = 14,
  'Devolvido' = 15,
  'Concluído' = 16,
  'Enviado para Fornecedor' = 17,
  'Recebido Parcial' = 18,
  'Recebido Total' = 19,
  'Aprovado' = 20,
}

export enum StatusDisponiveisDFD {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  Embargado = 'Embargado',
  EmAnalise = 'Em Análise',
  Cancelado = 'Cancelado',
}

type TransicaoValidaDFD = Record<StatusDisponiveisDFD, StatusDisponiveisDFD[]>;

export const StatusTransicaoDFD: TransicaoValidaDFD = {
  [StatusDisponiveisDFD.Aberto]: [
    StatusDisponiveisDFD.Aberto,
    StatusDisponiveisDFD.EmAnalise,
    StatusDisponiveisDFD.Cancelado,
  ],
  [StatusDisponiveisDFD.EmAnalise]: [
    StatusDisponiveisDFD.EmAnalise,
    StatusDisponiveisDFD.Autorizado,
    StatusDisponiveisDFD.Embargado,
    StatusDisponiveisDFD.Aberto,
  ],
  [StatusDisponiveisDFD.Autorizado]: [
    StatusDisponiveisDFD.Autorizado,
    StatusDisponiveisDFD.EmAnalise,
    StatusDisponiveisDFD.Cancelado,
    StatusDisponiveisDFD.Aberto,
  ],
  [StatusDisponiveisDFD.Embargado]: [StatusDisponiveisDFD.Embargado, StatusDisponiveisDFD.Aberto],
  [StatusDisponiveisDFD.Cancelado]: [StatusDisponiveisDFD.Cancelado, StatusDisponiveisDFD.Aberto],
};

export enum StatusDisponiveisCotacao {
  Aberto = 'Aberto',
  Cotando = 'Cotando',
  Cotado = 'Cotado',
}

type TransicaoValidaCotacao = Record<StatusDisponiveisCotacao, StatusDisponiveisCotacao[]>;

export const StatusTransicaoCotacao: TransicaoValidaCotacao = {
  [StatusDisponiveisCotacao.Aberto]: [StatusDisponiveisCotacao.Aberto, StatusDisponiveisCotacao.Cotando],
  [StatusDisponiveisCotacao.Cotando]: [
    StatusDisponiveisCotacao.Cotando,
    StatusDisponiveisCotacao.Aberto,
    StatusDisponiveisCotacao.Cotado,
  ],
  [StatusDisponiveisCotacao.Cotado]: [StatusDisponiveisCotacao.Cotado, StatusDisponiveisCotacao.Aberto],
};

export enum StatusDisponiveisProcessoAdm {
  Aberto = 'Aberto',
  EmAnalise = 'Em Análise',
  Embargado = 'Embargado',
  Autorizado = 'Autorizado',
}

type TransicaoValidaProcessoAdm = Record<StatusDisponiveisProcessoAdm, StatusDisponiveisProcessoAdm[]>;

export const StatusTransicaoProcessoAdm: TransicaoValidaProcessoAdm = {
  [StatusDisponiveisProcessoAdm.Aberto]: [StatusDisponiveisProcessoAdm.EmAnalise],
  [StatusDisponiveisProcessoAdm.EmAnalise]: [
    StatusDisponiveisProcessoAdm.Aberto,
    StatusDisponiveisProcessoAdm.Autorizado,
    StatusDisponiveisProcessoAdm.Embargado,
  ],
  [StatusDisponiveisProcessoAdm.Embargado]: [StatusDisponiveisProcessoAdm.Aberto],
  [StatusDisponiveisProcessoAdm.Autorizado]: [StatusDisponiveisProcessoAdm.Aberto],
};

export enum StatusDisponiveisTermoReferencia {
  Aberto = 'Aberto',
  EmAnalise = 'Em Análise',
  Autorizado = 'Autorizado',
  Cancelado = 'Cancelado',
}

type TransicaoValidaTermoReferencia = Record<StatusDisponiveisTermoReferencia, StatusDisponiveisTermoReferencia[]>;

export const StatusTransicaoTermoReferencia: TransicaoValidaTermoReferencia = {
  [StatusDisponiveisTermoReferencia.Aberto]: [StatusDisponiveisTermoReferencia.EmAnalise],
  [StatusDisponiveisTermoReferencia.EmAnalise]: [
    StatusDisponiveisTermoReferencia.Autorizado,
    StatusDisponiveisTermoReferencia.Aberto,
  ],
  [StatusDisponiveisTermoReferencia.Autorizado]: [
    StatusDisponiveisTermoReferencia.Aberto,
    StatusDisponiveisTermoReferencia.Cancelado,
  ],
  [StatusDisponiveisTermoReferencia.Cancelado]: [StatusDisponiveisTermoReferencia.Cancelado],
};

export enum StatusDisponiveisContratacao {
  Aberto = 'Aberto',
  Cancelado = 'Cancelado',
  EmAnalise = 'Em Análise',
  Homologado = 'Homologado',
  Autorizado = 'Autorizado',
  Concluido = 'Concluído',
  Embargado = 'Embargado',
}

type TransicaoValidaContratacao = Record<StatusDisponiveisContratacao, StatusDisponiveisContratacao[]>;

export const StatusTransicaoContratacao: TransicaoValidaContratacao = {
  [StatusDisponiveisContratacao.Aberto]: [
    StatusDisponiveisContratacao.Aberto,
    StatusDisponiveisContratacao.EmAnalise,
    StatusDisponiveisContratacao.Cancelado,
    StatusDisponiveisContratacao.Embargado,
  ],
  [StatusDisponiveisContratacao.Cancelado]: [
    StatusDisponiveisContratacao.Cancelado,
    StatusDisponiveisContratacao.Aberto,
  ],
  [StatusDisponiveisContratacao.EmAnalise]: [
    StatusDisponiveisContratacao.EmAnalise,
    StatusDisponiveisContratacao.Aberto,
    StatusDisponiveisContratacao.Cancelado,
    StatusDisponiveisContratacao.Autorizado,
    StatusDisponiveisContratacao.Embargado,
  ],
  [StatusDisponiveisContratacao.Homologado]: [
    StatusDisponiveisContratacao.Homologado,
    StatusDisponiveisContratacao.Aberto,
    StatusDisponiveisContratacao.Cancelado,
  ],
  [StatusDisponiveisContratacao.Autorizado]: [
    StatusDisponiveisContratacao.Autorizado,
    StatusDisponiveisContratacao.Concluido,
    StatusDisponiveisContratacao.Homologado,
    StatusDisponiveisContratacao.Cancelado,
  ],
  [StatusDisponiveisContratacao.Embargado]: [
    StatusDisponiveisContratacao.Embargado,
    StatusDisponiveisContratacao.Aberto,
  ],
  [StatusDisponiveisContratacao.Concluido]: [
    StatusDisponiveisContratacao.Aberto,
    StatusDisponiveisContratacao.EmAnalise,
    StatusDisponiveisContratacao.Concluido,
  ],
};

export enum StatusDisponiveisContrato {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  Embargado = 'Embargado',
  Confirmado = 'Confirmado',
  EmAnalise = 'Em Análise',
  Cancelado = 'Cancelado',
}

type TransicaoValidaContrato = Record<StatusDisponiveisContrato, StatusDisponiveisContrato[]>;

export const StatusTransicaoContrato: TransicaoValidaContrato = {
  [StatusDisponiveisContrato.Aberto]: [
    StatusDisponiveisContrato.Aberto,
    StatusDisponiveisContrato.EmAnalise,
    StatusDisponiveisContrato.Cancelado,
  ],
  [StatusDisponiveisContrato.EmAnalise]: [
    StatusDisponiveisContrato.EmAnalise,
    StatusDisponiveisContrato.Autorizado,
    StatusDisponiveisContrato.Embargado,
    StatusDisponiveisContrato.Aberto,
  ],
  [StatusDisponiveisContrato.Autorizado]: [
    StatusDisponiveisContrato.Autorizado,
    StatusDisponiveisContrato.EmAnalise,
    StatusDisponiveisContrato.Cancelado,
    StatusDisponiveisContrato.Aberto,
    StatusDisponiveisContrato.Confirmado,
  ],
  [StatusDisponiveisContrato.Embargado]: [StatusDisponiveisContrato.Embargado, StatusDisponiveisContrato.Aberto],
  [StatusDisponiveisContrato.Cancelado]: [StatusDisponiveisContrato.Cancelado, StatusDisponiveisContrato.Aberto],
  [StatusDisponiveisContrato.Confirmado]: [StatusDisponiveisContrato.Cancelado, StatusDisponiveisContrato.Aberto],
};

export enum StatusDisponiveisAta {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  Embargado = 'Embargado',
  Homologado = 'Homologado',
  EmAnalise = 'Em Análise',
  Cancelado = 'Cancelado',
}

type TransicaoValidaAta = Record<StatusDisponiveisAta, StatusDisponiveisAta[]>;

export const StatusTransicaoAta: TransicaoValidaAta = {
  [StatusDisponiveisAta.Aberto]: [
    StatusDisponiveisAta.Aberto,
    StatusDisponiveisAta.EmAnalise,
    StatusDisponiveisAta.Cancelado,
  ],
  [StatusDisponiveisAta.EmAnalise]: [
    StatusDisponiveisAta.EmAnalise,
    StatusDisponiveisAta.Autorizado,
    StatusDisponiveisAta.Embargado,
    StatusDisponiveisAta.Aberto,
  ],
  [StatusDisponiveisAta.Autorizado]: [
    StatusDisponiveisAta.Autorizado,
    StatusDisponiveisAta.EmAnalise,
    StatusDisponiveisAta.Cancelado,
    StatusDisponiveisAta.Aberto,
    StatusDisponiveisAta.Homologado,
  ],
  [StatusDisponiveisAta.Embargado]: [StatusDisponiveisAta.Embargado, StatusDisponiveisAta.Aberto],
  [StatusDisponiveisAta.Cancelado]: [StatusDisponiveisAta.Cancelado, StatusDisponiveisAta.Aberto],
  [StatusDisponiveisAta.Homologado]: [StatusDisponiveisAta.Cancelado],
};

export enum StatusDisponiveisPCA {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  EmAnalise = 'Em Análise',
  Concluido = 'Concluído',
  Reprovado = 'Reprovado',
}

type TransicaoValidaPCA = Record<StatusDisponiveisPCA, StatusDisponiveisPCA[]>;

export const StatusTransicaoPCA: TransicaoValidaPCA = {
  [StatusDisponiveisPCA.Aberto]: [StatusDisponiveisPCA.Aberto, StatusDisponiveisPCA.EmAnalise],
  [StatusDisponiveisPCA.EmAnalise]: [
    StatusDisponiveisPCA.EmAnalise,
    StatusDisponiveisPCA.Autorizado,
    StatusDisponiveisPCA.Reprovado,
    StatusDisponiveisPCA.Aberto,
  ],
  [StatusDisponiveisPCA.Autorizado]: [StatusDisponiveisPCA.Autorizado, StatusDisponiveisPCA.Concluido],
  [StatusDisponiveisPCA.Concluido]: [StatusDisponiveisPCA.Concluido],
  [StatusDisponiveisPCA.Reprovado]: [StatusDisponiveisPCA.Reprovado, StatusDisponiveisPCA.Aberto],
};

export enum StatusDisponiveisETP {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  EmAnalise = 'Em Análise',
  Concluido = 'Concluído',
  Reprovado = 'Reprovado',
}

type TransicaoValidaETP = Record<StatusDisponiveisETP, StatusDisponiveisETP[]>;

export const StatusTransicaoETP: TransicaoValidaETP = {
  [StatusDisponiveisETP.Aberto]: [StatusDisponiveisETP.Aberto, StatusDisponiveisETP.EmAnalise],
  [StatusDisponiveisETP.EmAnalise]: [
    StatusDisponiveisETP.EmAnalise,
    StatusDisponiveisETP.Autorizado,
    StatusDisponiveisETP.Reprovado,
    StatusDisponiveisETP.Aberto,
  ],
  [StatusDisponiveisETP.Autorizado]: [
    StatusDisponiveisETP.Aberto,
    StatusDisponiveisETP.Autorizado,
    StatusDisponiveisETP.Concluido,
  ],
  [StatusDisponiveisETP.Concluido]: [StatusDisponiveisETP.Concluido, StatusDisponiveisETP.Aberto],
  [StatusDisponiveisETP.Reprovado]: [StatusDisponiveisETP.Reprovado, StatusDisponiveisETP.Aberto],
};

export enum StatusDisponiveisAR {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  EmAnalise = 'Em Análise',
  Concluido = 'Concluído',
  Reprovado = 'Reprovado',
}

type TransicaoValidaAR = Record<StatusDisponiveisAR, StatusDisponiveisAR[]>;

export const StatusTransicaoAR: TransicaoValidaAR = {
  [StatusDisponiveisAR.Aberto]: [StatusDisponiveisAR.Aberto, StatusDisponiveisAR.EmAnalise],
  [StatusDisponiveisAR.EmAnalise]: [
    StatusDisponiveisAR.EmAnalise,
    StatusDisponiveisAR.Autorizado,
    StatusDisponiveisAR.Reprovado,
    StatusDisponiveisAR.Aberto,
  ],
  [StatusDisponiveisAR.Autorizado]: [StatusDisponiveisAR.Autorizado, StatusDisponiveisAR.Concluido],
  [StatusDisponiveisAR.Concluido]: [StatusDisponiveisAR.Concluido],
  [StatusDisponiveisAR.Reprovado]: [StatusDisponiveisAR.Reprovado, StatusDisponiveisAR.Aberto],
};

export enum StatusDisponiveisAditivo {
  Aberto = 'Aberto',
  Autorizado = 'Autorizado',
  Embargado = 'Embargado',
  EmAnalise = 'Em Análise',
  Cancelado = 'Cancelado',
}

type TransicaoValidaAditivo = Record<StatusDisponiveisAditivo, StatusDisponiveisAditivo[]>;

export const StatusTransicaoAditivo: TransicaoValidaAditivo = {
  [StatusDisponiveisAditivo.Aberto]: [
    StatusDisponiveisAditivo.Aberto,
    StatusDisponiveisAditivo.EmAnalise,
    StatusDisponiveisAditivo.Cancelado,
  ],
  [StatusDisponiveisAditivo.EmAnalise]: [
    StatusDisponiveisAditivo.EmAnalise,
    StatusDisponiveisAditivo.Autorizado,
    StatusDisponiveisAditivo.Embargado,
    StatusDisponiveisAditivo.Aberto,
  ],
  [StatusDisponiveisAditivo.Autorizado]: [
    StatusDisponiveisAditivo.Autorizado,
    StatusDisponiveisAditivo.EmAnalise,
    StatusDisponiveisAditivo.Cancelado,
    StatusDisponiveisAditivo.Aberto,
  ],
  [StatusDisponiveisAditivo.Embargado]: [StatusDisponiveisAditivo.Embargado, StatusDisponiveisAditivo.Aberto],
  [StatusDisponiveisAditivo.Cancelado]: [StatusDisponiveisAditivo.Cancelado, StatusDisponiveisAditivo.Aberto],
};

export enum StatusDisponiveisPedidoCompra {
  Aberto = 'Aberto',
  EmAnalise = 'Em Análise',
  Autorizado = 'Autorizado',
  Aprovado = 'Aprovado',
  Embargado = 'Embargado',
  Cancelado = 'Cancelado',
  EnviadoFornecedor = 'Enviado para Fornecedor',
  RecebidoParcial = 'Recebido Parcial',
  RecebidoTotal = 'Recebido Total',
}

type TransicaoValidaPedidoCompra = Record<StatusDisponiveisPedidoCompra, StatusDisponiveisPedidoCompra[]>;

export const StatusTransicaoPedidoCompra: TransicaoValidaPedidoCompra = {
  [StatusDisponiveisPedidoCompra.Aberto]: [
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.EmAnalise,
    StatusDisponiveisPedidoCompra.Cancelado,
  ],
  [StatusDisponiveisPedidoCompra.EmAnalise]: [
    StatusDisponiveisPedidoCompra.EmAnalise,
    StatusDisponiveisPedidoCompra.Autorizado,
    StatusDisponiveisPedidoCompra.Embargado,
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.Cancelado,
  ],
  [StatusDisponiveisPedidoCompra.Autorizado]: [
    StatusDisponiveisPedidoCompra.Autorizado,
    StatusDisponiveisPedidoCompra.Cancelado,
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.EnviadoFornecedor,
    StatusDisponiveisPedidoCompra.Aprovado,
  ],
  [StatusDisponiveisPedidoCompra.Aprovado]: [
    StatusDisponiveisPedidoCompra.Cancelado,
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.EnviadoFornecedor,
  ],
  [StatusDisponiveisPedidoCompra.Embargado]: [
    StatusDisponiveisPedidoCompra.Embargado,
    StatusDisponiveisPedidoCompra.Aberto,
  ],
  [StatusDisponiveisPedidoCompra.Cancelado]: [StatusDisponiveisPedidoCompra.Cancelado],
  [StatusDisponiveisPedidoCompra.EnviadoFornecedor]: [
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.RecebidoParcial,
    StatusDisponiveisPedidoCompra.RecebidoTotal,
    StatusDisponiveisPedidoCompra.Cancelado,
  ],
  [StatusDisponiveisPedidoCompra.RecebidoParcial]: [
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.RecebidoParcial,
    StatusDisponiveisPedidoCompra.RecebidoTotal,
    StatusDisponiveisPedidoCompra.Cancelado,
  ],
  [StatusDisponiveisPedidoCompra.RecebidoTotal]: [
    StatusDisponiveisPedidoCompra.Aberto,
    StatusDisponiveisPedidoCompra.RecebidoParcial,
    StatusDisponiveisPedidoCompra.RecebidoTotal,
    StatusDisponiveisPedidoCompra.Cancelado,
  ],
};
