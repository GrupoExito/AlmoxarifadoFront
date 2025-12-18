import { StatusDisponiveisProcessoAdm } from '@pages/shared/models/fluxo.model';

export enum EnumPermissaoStatusProcessoAdministrativo {
  'EditarProcessoAdministrativo' = 1,
  'AdicionarDFD' = 2,
  'RemoverDFD' = 3,
  'RemoverAnexo' = 4,
}

type PermissaoStatusValidaProcessoAdministrativo = Record<
  StatusDisponiveisProcessoAdm,
  EnumPermissaoStatusProcessoAdministrativo[]
>;

export const PermissaoStatusProcessoAdministrativo: PermissaoStatusValidaProcessoAdministrativo = {
  [StatusDisponiveisProcessoAdm.Aberto]: [
    EnumPermissaoStatusProcessoAdministrativo.EditarProcessoAdministrativo,
    EnumPermissaoStatusProcessoAdministrativo.AdicionarDFD,
    EnumPermissaoStatusProcessoAdministrativo.RemoverDFD,
    EnumPermissaoStatusProcessoAdministrativo.RemoverAnexo,
  ],
  [StatusDisponiveisProcessoAdm.EmAnalise]: [
    EnumPermissaoStatusProcessoAdministrativo.EditarProcessoAdministrativo,
  ],
  [StatusDisponiveisProcessoAdm.Embargado]: [],
  [StatusDisponiveisProcessoAdm.Autorizado]: [
    EnumPermissaoStatusProcessoAdministrativo.EditarProcessoAdministrativo,
  ],
};
