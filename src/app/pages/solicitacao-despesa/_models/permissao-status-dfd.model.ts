import { StatusDisponiveisDFD } from '@pages/shared/models/fluxo.model';

export enum EnumPermissaoStatusDFD {
  'EditarSecretaria' = 1,
  'EditarDadosSolicitacao' = 2,
  'AdicionarItem' = 3,
  'RemoverItem' = 4,
  'EditarQuantidadeItem' = 5,
  'AdicionarDotacao' = 6,
  'RemoverDotacao' = 7,
  'AdicionarAnexo' = 8,
  'RemoverAnexo' = 9,
  'AdicionarTR' = 10,
  'RemoverTR' = 11,
}

type PermissaoStatusValidaDFD = Record<StatusDisponiveisDFD, EnumPermissaoStatusDFD[]>;

export const PermissaoStatusDFD: PermissaoStatusValidaDFD = {
  [StatusDisponiveisDFD.Aberto]: [
    EnumPermissaoStatusDFD.EditarSecretaria,
    EnumPermissaoStatusDFD.EditarDadosSolicitacao,
    EnumPermissaoStatusDFD.AdicionarItem,
    EnumPermissaoStatusDFD.RemoverItem,
    EnumPermissaoStatusDFD.EditarQuantidadeItem,
    EnumPermissaoStatusDFD.AdicionarDotacao,
    EnumPermissaoStatusDFD.RemoverDotacao,
    EnumPermissaoStatusDFD.AdicionarAnexo,
    EnumPermissaoStatusDFD.RemoverAnexo,
    EnumPermissaoStatusDFD.AdicionarTR,
    EnumPermissaoStatusDFD.RemoverTR,
  ],
  [StatusDisponiveisDFD.Autorizado]: [
    EnumPermissaoStatusDFD.EditarSecretaria,
    EnumPermissaoStatusDFD.EditarDadosSolicitacao,
    EnumPermissaoStatusDFD.AdicionarDotacao,
    EnumPermissaoStatusDFD.RemoverDotacao,
    EnumPermissaoStatusDFD.AdicionarAnexo,
    EnumPermissaoStatusDFD.RemoverAnexo,
    EnumPermissaoStatusDFD.AdicionarTR,
    EnumPermissaoStatusDFD.RemoverTR,
  ],
  [StatusDisponiveisDFD.EmAnalise]: [
    EnumPermissaoStatusDFD.EditarSecretaria,
    EnumPermissaoStatusDFD.EditarDadosSolicitacao,
    EnumPermissaoStatusDFD.AdicionarDotacao,
    EnumPermissaoStatusDFD.RemoverDotacao,
    EnumPermissaoStatusDFD.AdicionarAnexo,
    EnumPermissaoStatusDFD.RemoverAnexo,
    EnumPermissaoStatusDFD.AdicionarTR,
    EnumPermissaoStatusDFD.RemoverTR,
  ],
  [StatusDisponiveisDFD.Embargado]: [EnumPermissaoStatusDFD.AdicionarAnexo],
  [StatusDisponiveisDFD.Cancelado]: [EnumPermissaoStatusDFD.AdicionarAnexo],
};

/*
1 - Editar Secretaria - Setor - Responsavel (Dados da Requerente)
2 - Editar dados da Solicitação
3 - Adicionar Item
4 - Remover Item
5 - Editar Quantidade Item
6 - Adicionar Dotação
7 - Remover Dotação
8 - Adicionar Anexo
9 - Remover Anexo
10 - Adicionar TR
11 - Remover TR

Aberto = 'Aberto',
Autorizado = 'Autorizado',
Embargado = 'Embargado',
EmAnalise = 'Em Análise',
Cancelado = 'Cancelado',

Quanto o Status for "Aberto", pode alterar tudo.
Quando o Status for "Em Analise" ou "Autorizado", pode alterar tudo, exceto itens (adicionar, remover, alterar quantidade)
Quando for qualquer status diferente de "Aberto", "Em Analise" e "Autorizado", pode apenas anexar arquivos e imprimir
*/
