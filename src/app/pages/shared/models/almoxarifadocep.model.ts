import { Estados } from './estados.enum';

export interface Almoxarifadocep {
  logradouro: string;
  cep: string;
  bairro: string;
  localidade: string;
  uf: Estados;
}
