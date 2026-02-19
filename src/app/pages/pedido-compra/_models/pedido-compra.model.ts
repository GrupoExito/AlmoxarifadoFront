export interface PedidoCompraSaldo {
  id?: number;
  fornecedor_id?: number;
  fornecedor?: string;   // <-- novo campo
  objeto: string;
  quantidade_entrada?: number;
  saldo_pedido?: number;
}