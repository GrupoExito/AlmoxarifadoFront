import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { ModalidadeCompra } from '@pages/modalidade-compra/_models/modalidade-compra.model';
import { Contrato, TipoContrato } from './contrato.model';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';
import { Pessoa } from '@pages/pessoa/_models/pessoa.model';

export interface ContratoData {
  contrato: Contrato;
  exercicios: Exercicio[];
  modalidades: ModalidadeCompra[];
  tiposDemanda: TipoDemanda[];
  modelosDocumento: ModeloDocumento[];
  tiposContratos: TipoContrato[];
  fiscalContrato: Pessoa[];
}
