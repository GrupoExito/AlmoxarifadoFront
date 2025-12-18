export interface ImpressaoDocumentoProcessoAdministrativo {
  impressao_id: number;
  impressao_nome: string;
  processo_adm_id: number;
}

export enum DocumentoProcessoAdministrativo {
  'Processo Administrativo com Dotação',
  'Processo Administrativo sem dotação',
  'CI - Ao Setor de Licitação',
  'CI - Ao Setor Financeiro',
  'Justificativa da CPL',
  'Encaminhamento da CPL ao Jurídico',
  'Termo de Autuação',
  'Anexo 1',
  'Despacho do Gabinete do Prefeito',
}
