export interface Orgao {
  id?: number;
  descricao: string;
  datainicio?: string;
  datafim?: string;
  tipopoder: string; // 1 - Legislativo, 2 - Executivo, 3 - Executivo Fundo
  codigo_tcm?: number;
  id_descricao?: string;
}
