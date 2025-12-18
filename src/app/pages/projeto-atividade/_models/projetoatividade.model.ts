export interface ProjetoAtividade {
  id?: number;
  numero: number;
  tipo: number;
  descricao_acaogoverno: string;
  programa_id: number;
  funcao_governo_id: number;
  sub_funcao_governo_id: number;
  programa_nome?: string;
  funcao_nome?: string;
  sub_funcao_nome?: string;
  numero_descricao_acaogoverno?: string;
}
