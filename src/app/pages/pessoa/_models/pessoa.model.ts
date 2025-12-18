export interface Pessoa {
  id?: number;
  data_cadastro?: string;
  cpf: string;
  rg: string;
  telefone: string;
  celular: string;
  orgao_expeditor_rg: string;
  nome: string;
  nascimento?: string;
  tipo: number;
  responsavel: boolean;
  usuario_id: number;
  sexo_id: number;
  foto: string;
  assinatura: string;
  usuario_nome?: string;
  path_file: string;
  email: string;
  fiscal_contrato?: string;
  gcargo_id?: number;
}
export interface PessoaGestao {
  id?: number;
  gpessoa_id: number;
  data_inicio: string;
  data_fim: string;
  ultima_gestao: boolean;
}

export interface PessoaGestaoData {
  pessoaGestao: PessoaGestao;
  pessoas: Pessoa[];
 }