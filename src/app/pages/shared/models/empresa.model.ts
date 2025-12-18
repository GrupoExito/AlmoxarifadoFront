import { Estados } from './estados.enum';

export interface Empresa {
  status: string;
  ultima_atualizacao: string;
  cnpj: string;
  tipo: 'MATRIZ' | 'FILIAL';
  porte: string;
  nome: string;
  fantasia: string;
  abertura: string;
  atividade_principal: atividade_principal[];
  atividades_secundarias: atividades_secundarias[];
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  localidade: string;
  uf: Estados;
  email: string;
  telefone: string;
  efr: string;
  situacao: string;
  data_situacao: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  qsa: qsa[];
  billing: billing;
  municipio?: string;
}

interface atividade_principal {
  code: string;
  text: string;
}

interface atividades_secundarias {
  code: string;
  text: string;
}

interface qsa {
  nome: string;
  qual: string;
  pais_origem: string;
  nome_rep_legal: string;
  qual_rep_legal: string;
}

interface billing {
  free: boolean;
  database: boolean;
}
