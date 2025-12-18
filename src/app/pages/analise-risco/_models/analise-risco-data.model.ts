import { AnaliseRisco } from './analise-risco.model';

export interface ARData {
  analiseRisco: AnaliseRisco;
}

export interface ARDataEtapasHeader {
  quantidade_sds: number;
  quantidade_etps: number;
  quantidade_historico: number;
}
