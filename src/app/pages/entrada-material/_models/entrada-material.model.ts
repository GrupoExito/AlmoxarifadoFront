export interface EntradaMaterial {
  id?: number;
  nota: string;
  status_id: number;
  fornecedor_id: number;
  secretaria_fundo_id: number;
  almoxarifado_id: number;
  data_entrada: string;
  data_cancelamento?: string;
  usuario_entrada_id?: number;
  usuario_cancelamento_id?: number;
  pedido_despesa_id?: number;
  pedido_despesa_descricao?: string;
  tipo_entrada: number;
  tipo_entrada_id: number;
  secretaria_origem_id?: number;
  almoxarifado_origem_id?: number;
  saida_material_id?: number;
  data_registro?: string;
  data_nota?: string;
  almoxarifado?: string;
  fornecedor?: string;
  secretaria?: string;
  status?: string;
  tipo_entrada_descricao?: string;
  status_descricao?: string;
  observacao: string;
  quantidade_item?: number;
}

export interface ItemMovimentacao {
  entrada?: number;
  codigo_item?: number;
  descricao?: string;
}
