import { StatusDisponiveisCotacao } from '@pages/shared/models/fluxo.model';

export enum EnumPermissaoStatusCotacao {
  'EditarCotacao' = 1,
  'AdicionarPA' = 2,
  'RemoverPA' = 3,
  'AdicionarFornecedor' = 4,
  'RemoverFornecedor' = 5,
  'EditarPrecoFornecedor' = 6,
  'RemoverAnexo' = 7,
  'AdicionarLote' = 8,
  'RemoverLote' = 9,
  'AdicionarItemLote' = 10,
  'RemoverItemLote' = 11,
}

type PermissaoStatusValidaDFD = Record<StatusDisponiveisCotacao, EnumPermissaoStatusCotacao[]>;

export const PermissaoStatusCotacao: PermissaoStatusValidaDFD = {
  [StatusDisponiveisCotacao.Aberto]: [
    EnumPermissaoStatusCotacao.EditarCotacao,
    EnumPermissaoStatusCotacao.AdicionarPA,
    EnumPermissaoStatusCotacao.RemoverPA,
    EnumPermissaoStatusCotacao.RemoverAnexo,
    EnumPermissaoStatusCotacao.AdicionarLote,
    EnumPermissaoStatusCotacao.RemoverLote,
    EnumPermissaoStatusCotacao.AdicionarItemLote,
    EnumPermissaoStatusCotacao.RemoverItemLote,
  ],
  [StatusDisponiveisCotacao.Cotando]: [
    EnumPermissaoStatusCotacao.AdicionarFornecedor,
    EnumPermissaoStatusCotacao.RemoverFornecedor,
    EnumPermissaoStatusCotacao.EditarPrecoFornecedor,
  ],
  [StatusDisponiveisCotacao.Cotado]: [],
};
