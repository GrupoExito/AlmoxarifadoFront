import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { PcaUnificado } from './planejamento-contratacao.model';

export interface PcaUnificadoData {
  pcaUnificado: PcaUnificado;
  secretarias: SecretariaFundo[];
  exercicios: Exercicio[];
  tiposDemanda: TipoDemanda[];
  // permissaoStatus: number[];
}

export interface PcaDataEtapasHeader {
  quantidade_ffd: number;
  quantidade_historico: number;
  pca_unificado_id: number;
  pca_unificado_status: number;
  quantidade_anexos: number;
}
