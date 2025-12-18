export interface ContaBancaria {
  id?: number;
  numero: number;
  agencia: number;
  descricao: string;
  tipo: number;
  fonte_recurso?: string;
}
