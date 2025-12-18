import { Exercicio } from '@pages/shared/models/exercicio.model';
import { Ata } from './ata.model';
import { Contratacao } from '@pages/contratacao/_models/contratacao.model';
import { ContratacaoLoteFornecedorItem } from '@pages/contratacao/_models/contratacao-lote-fornecedor-item.model';

export interface AtaData {
  ata: Ata;
  exercicios: Exercicio[];
  fornecedores: ContratacaoLoteFornecedorItem[];
  contratacao: Contratacao[];
}

export interface AtaHeaderData {
  quantidade_item: number;
  valorTotal: number;
}

export interface AtaHeader {
  quantidade_item?: number;
  quantidade_dotacao?: number;
  quantidade_aditivos?: number;
  quantidade_historico?: number;
  quantidade_pedido_compra?: number;
  quantidade_contratacao?: number;
  quantidade_anexo?: number;
}
