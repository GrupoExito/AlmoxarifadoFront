export interface Saldo {
  total_contratacao: number;
  total_reservado: number;
  total_contrato: number;
  total_sd: number;
  contrato_reservado: number;
  contrato_comprado: number;
  sd_comprado: number;
  sd_reservado: number;
  sd_quantidade: number;
  quantidade_aditivada: number;
  valor_aditivada?: number;
  data_aditivada?: string;
  aditivado?: boolean;
  data_fim?: string;
}

export interface SaldoItemPedidoCompraPorContrato {
  pedido_compra_id: number;
  gproduto_servico_id: number;
  sd_id: number;
  contrato_id: number;
  saldo: number;
}
