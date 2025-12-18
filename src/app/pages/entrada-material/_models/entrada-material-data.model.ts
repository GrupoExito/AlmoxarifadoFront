import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { PedidoCompra } from '@pages/compra/_models/pedido-compra.model';
import { Fornecedor } from '@pages/fornecedor/_models/fornecedor.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { EntradaMaterial } from './entrada-material.model';

export interface EMData {
  entradaMaterial: EntradaMaterial;
  secretarias: SecretariaFundo[];
  fornecedores: Fornecedor[];
  almoxarifados: Almoxarifado[];
  pedidoCompra: PedidoCompra[];
}

export interface EMDataEtapasHeader {
  quantidade_itens: number;
  quantidade_historico?: number;
  valorTotal: number;
}
