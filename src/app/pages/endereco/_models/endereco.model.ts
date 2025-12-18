export interface Endereco {
  id?: number;
  endereco: string;
  logradouro: string;
  nrologradouro: number;
  complemento: string;
  bairro: string;
  municipio_id: number;
  cep: string;
  endereco_completo?: string;
}
