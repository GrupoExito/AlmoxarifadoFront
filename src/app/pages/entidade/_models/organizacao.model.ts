export interface Organizacao {
  id: number;
  nome: string;
  codigotcm?: number;
  codigotce?: number;
  datacadastro?: string;
  cpfcnpj?: string;
  telefone?: string;
  celular?: string;
  email?: string;
  endereco?: string;
  nrologradouro?: string;
  complemento?: string;
  bairro?: string;
  municipio_id: number;
  cep?: string;
  ativo: boolean;
  inscricaoestadual?: string;
  logotipo: string;
}
