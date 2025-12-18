export interface SolicitanteMaterial {
  id?: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  setores?: number[];
  ativo: number;
}
