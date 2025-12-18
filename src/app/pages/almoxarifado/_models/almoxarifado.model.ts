export interface Almoxarifado {
  id?: number;
  descricao: string;
  logradouro: string;
  numero_logradouro: string;
  logradouro_complemento: string;
  bairro: string;
  municipio: string;
  uf?: number;
  cep: string;
  ativo?: boolean;
  usuario_cadastro_id?: number;
  usuario_exclusao_id?: number;
  data_cadastro?: string;
  data_exclusao?: string;
  telefone?: string;
}

export interface AData {
  almoxarifados: Almoxarifado;
}

export interface ADataEtapasHeader {}