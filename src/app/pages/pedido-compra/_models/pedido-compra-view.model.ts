export interface PedidoCompraResumo {
  id: number;
  quantidade_pedido: number;    // total do pedido (soma itens)
  quantidade_entrada: number;   // total entregue/entrada (soma itens)
  fornecedor?: string;
}

export interface PedidoCompraSaldoItem {
  id?: number;
  produto_servico_id?: number;
  descricao_almoxarifado?: string;
  quantidade_pedido?: number;
  quantidade_entrada?: number;
  saldo_pedido?: number;
}

export interface PedidoCompraItemDetalhe {
  produto?: string;
  unidade?: string;
  quantidade_pedido: number;
  quantidade_entrada: number; // entregue
}

export interface PedidoCompraEntradaDetalhe {
  id: number;
  data_entrada?: string;
  nota?: string;
  fornecedor?: string;
  quantidade_total?: number;
}

export interface PedidoCompraEntrada {
  entrada_id?: number;
  data_entrada?: string;
  nota?: string;
}
