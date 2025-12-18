export interface AssinaturaDigitalizadaETPDTO {
  id?: number;
  etp_id: number;
  usuario_id: number;
  senha?: string;
}

export interface AssinaturaDigitalizadaDFDDTO {
  id?: number;
  dfd_id: number;
  usuario_id: number;
  senha?: string;
}

export interface AssinaturaDigitalizadaPedidoCompraDTO {
  id?: number;
  pedido_compra_id: number;
  usuario_id: number;
  senha?: string;
}

export interface AssinaturaDigitalizadaCotacaoDTO {
  id?: number;
  cotacao_id: number;
  usuario_id: number;
  senha?: string;
}
