export interface ComissaoLicitacao {
  id?: number;
  numero: string;
  datainicial: string;
  datafinal: string;
  tipo: string;
  documento_criacao_comissao_id?: number;
  documento_criacao_descricao?: string;
  numerodocumento?: string;
  ativa: boolean;
}
