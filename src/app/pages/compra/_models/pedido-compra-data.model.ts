import { Exercicio } from '@pages/shared/models/exercicio.model';
import { PedidoCompra } from './pedido-compra.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Orgao } from '@pages/orgao/_models/orgao.model';
import { ContaBancaria } from '@pages/conta-bancaria/_models/conta-bancaria.model';
import { LocalProdutoServico } from '@pages/local-produto-servico/_models/localprodutoservico.model';

export interface PedidoCompraData {
  pedidoCompra: PedidoCompra;
  exercicios: Exercicio[];
  secretarias: SecretariaFundo[];
  orgaos: Orgao[];
  contasBancarias: ContaBancaria[];
  permissaoStatus: number[];
  localEntrega: LocalProdutoServico[];
}

export interface PedidoCompraHeaderData {
  quantidade_item: number;
  quantidade_dotacao?: number;
  valorTotal: number;
}
