export interface SaidaMaterial {
  id?: number;
  status_id: number;
  almoxarifado_id: number;
  secretaria_id: number;
  solicitante_id: number;
  setor_id: number;
  data_solicitacao?: string;
  data_cancelamento?: string;
  usuario_cancelamento_id?: number;
  usuario_id: number;
  observacao: string;
  tipo_saida_id: number;
  secretaria_destino_id?: number;
  almoxarifado_destino_id?: number;
  data_registro?: string;
  centro_custo_id: number;
  almoxarifado?: string;
  solicitante?: string;
  secretaria?: string;
  status?: string;
  tipo_saida_descricao?: string;
  setor?: string;
  id_status?: number;
  unidade_externa_id?: number;
  responsavel_retirada_id?: number;
  status_descricao?: String;
  //cidadao_id?: number;
  cidadao?: string;
  codigo_transporte?: string;
  disponivel_entrega?: boolean;
}

export interface SaidaMaterialTransferencia {
  id?: number;
  status_id?: number;
  tipo_saida_id?: number;
  usuario_id?: number;
  observacao?: string;
}

export interface ItemMovimentacao {
  entrada?: number;
  codigo_item?: number;
  descricao?: string;
}
