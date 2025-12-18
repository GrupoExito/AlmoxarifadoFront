export interface Municipio {
  id?: number;
  cep: string;
  nome: string;
  estado_id: number;
  fk_estado_id?: number;
  estado_nome?: string;
}
