import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { ProcessoAdministrativo } from './processo-administrativo.model';
import { ModalidadeCompra } from '@pages/modalidade-compra/_models/modalidade-compra.model';

export interface PAData {
  processoAdministrativo: ProcessoAdministrativo;
  exercicios: Exercicio[];
  tiposDemanda: TipoDemanda[];
  modalidades: ModalidadeCompra[];
  permissaoStatus: number[];
}

export interface PADataEtapasHeader {
  quantidade_anexos: number;
  quantidade_sds: number;
  quantidade_historico: number;
  cotacao_id: number;
  cotacao_status: number;
  modalidade_compra: string;
  contratacao_id: number;
  contratacao_status: number;
  quantidade_item_sd: number;
}
