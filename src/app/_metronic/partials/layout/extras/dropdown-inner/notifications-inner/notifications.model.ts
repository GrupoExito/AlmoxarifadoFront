export type AreaKey = 'DFD' | 'PAD' | 'CONTRATACAO' | 'CONTRATO' | 'PEDIDO_COMPRA';
export type SubTab = 'NAO_LIDAS' | 'LIDAS';

export interface Area {
  key: AreaKey;
  label: string;
}

// export interface Notificacao {
//   id: number | string;
//   area_id: number; // dfd_id, pad_id, contratacao_id, contrato_id, pedido_compra_id
//   area: AreaKey;
//   areaLabel: string;
//   titulo: string;
//   descricao: string;
//   tempo: string; // ex.: "há 10 min"
//   mencao_lida: boolean;
//   usuario_id: number;
//   usuario_nome: string;
//   usuario_criacao_id: number;
//   usuario_criacao_nome: string;
//   pendencia: boolean;
//   tipo: 'info' | 'sucesso' | 'aviso' | 'erro';
//   icone: 'padrao' | 'comentario' | 'ok' | 'alerta';
// }

export interface Notificacao {
  id: number | string;
  area_id: number;
  area: AreaKey;
  areaLabel: string;
  titulo: string;
  descricao: string;
  tempo: string;
  mencao_lida: boolean;
  usuario_id: number;
  usuario_nome: string;
  usuario_criacao_id: number;
  usuario_criacao_nome: string;
  pendencia: boolean;
  tipo: 'info' | 'sucesso' | 'aviso' | 'erro';
  icone: 'padrao' | 'comentario' | 'ok' | 'alerta';

  data_mencao?: string;
}

export interface NotificacaoMencao {
  id: number;
  area: AreaKey; // já vem como: DFD | PAD | CONTRATACAO | CONTRATO | PEDIDO_COMPRA
  area_id: number;
  usuario_id: number;
  usuario_criacao_id: number;
  pendencia: boolean; // SEMPRE boolean
  mencao_lida: boolean; // SEMPRE boolean
  data_mencao: string; // "2025-10-10 16:28:44.810" (sem T) ou ISO
  descricao: string | null;
  titulo: string;
  usuario_nome: string;
  usuario_criacao_nome: string;
}

export interface AreaGroupDto {
  area: AreaKey;
  total: number;
  lidas: number;
  nao_lidas: number;
  area_ids?: number[];
  nao_lidas_items: NotificacaoMencao[];
  lidas_items: NotificacaoMencao[];
}

export interface NotificacaoMencaoResponse {
  total_pendencias: number;
  areas: AreaGroupDto[];
}
