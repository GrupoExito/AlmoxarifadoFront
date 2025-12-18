import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { PcaSimplificado } from './pca-simplificado.model';

export interface PcaSimplificadoData {
  pcaSimplificado: PcaSimplificado;
  exercicios: Exercicio[];
  secretarias: SecretariaFundo[];
}
export interface PcaSimplificadoDataEtapasHeader {
  quantidade_item: number;
  quantidade_historico: number;
}
