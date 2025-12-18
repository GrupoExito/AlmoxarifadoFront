import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TermoReferencia } from './termo-referencia.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { ModeloDocumento } from '@pages/modelo-documento/_models/modelo-documento.model';

export interface TRData {
  termoReferencia: TermoReferencia;
  exercicios: Exercicio[];
  setores: Setor[];
  modelos: ModeloDocumento[];
  permissaoStatus: number[];
}

export interface TRDataEtapasHeader {
  quantidade_anexos: number;
  quantidade_sds: number;
  quantidade_historico: number;
}
