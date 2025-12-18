export interface Cotacao {
  id?: number;
  gexercicio_id: number;
  data_cotacao?: string;
  descricao: string;
  nota_tecnica?: string;
  lote: boolean;
  flstatus_id?: number;
  flsetor_id?: number;
  status?: string;
  pendencia?: number;
  responsaveis?: number[];
  flsetor_usuario?: number;
}

export interface CotacaoResponsavelTecnicoUsuario {
  id: number;
  dfd_id: number;
  usuario_id: number;
}
