import { StatusDisponiveisTermoReferencia } from '@pages/shared/models/fluxo.model';

export enum EnumPermissaoStatusTermoReferencia {
  'EditarTermoReferencia' = 1,
  'AdicionarDFD' = 2,
  'RemoverDFD' = 3,
  'RemoverAnexo' = 4,
}

type PermissaoStatusValidaTermoReferencia = Record<
  StatusDisponiveisTermoReferencia,
  EnumPermissaoStatusTermoReferencia[]
>;

export const PermissaoStatusTermoReferencia: PermissaoStatusValidaTermoReferencia = {
  [StatusDisponiveisTermoReferencia.Aberto]: [
    EnumPermissaoStatusTermoReferencia.EditarTermoReferencia,
    EnumPermissaoStatusTermoReferencia.AdicionarDFD,
    EnumPermissaoStatusTermoReferencia.RemoverDFD,
    EnumPermissaoStatusTermoReferencia.RemoverAnexo,
  ],
  [StatusDisponiveisTermoReferencia.EmAnalise]: [],
  [StatusDisponiveisTermoReferencia.Autorizado]: [],
  [StatusDisponiveisTermoReferencia.Cancelado]: [],
};
