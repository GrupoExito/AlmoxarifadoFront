import { EstudoTecnicoPreliminar } from './estudo-tecnico-preliminar.model';

export interface ETPData {
  estudoTecnicoPreliminar: EstudoTecnicoPreliminar;
  responsaveis: number[];
}

export interface ETPDataEtapasHeader {
  quantidade_sds: number;
  quantidade_historico: number;
  quantidade_anexos: number;
}
