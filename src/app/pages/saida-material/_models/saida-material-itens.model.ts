export interface SaidaMaterialItem {
  id?: number;
  saida_material_id?: number;
  entrada_material_item_id?: number;
  produto_servico_id?: number;
  quantidade?: number;
  valor?: number;
  data_validade?: string | null;
  numero_lote?: string;
  id_und_medida_descricao?: string;
  item_codigo?: number;
  item_descricao?: string;
  saldo_disponivel?: number;
  almoxarifado_id?: number;
  und_descricao?: string;
  qtd_solicitada?: number; // para exibir na tela após autorizado
  qtd_autorizada?: number; // para exibir na tela após autorizado
  valor_total?: number;
}

export interface ListarItemDisponivel {
  id?: number;
  descricao?: string;
  item_codigo?: number;
  id_und_medida_descricao?: string;
  saldo?: number;
  codigo_barra?: string;
}

export interface SaldoItemGeral {
  id?: number;
  item_codigo?: number;
  id_und_medida_descricao?: string;
  quantidade_entrada?: number;
  quantidade_saida?: number;
  saldo?: number;
}

export interface ListarLoteDatavalidade {
  id?: number;
  descricao?: string;
  item_codigo?: number;
  id_und_medida_descricao?: string;
  numero_lote?: string;
  data_validade?: string;
  saldo?: number;
}

export interface SaldoItemLoteDatavalidade {
  id?: number;
  item_codigo?: number;
  id_und_medida_descricao?: string;
  entrada_lote_data_validade?: number;
  quantidade_saida?: number;
  saldo_lote_data_validade?: number;
  numero_lote?: string;
  data_validade?: string | null;
}


export interface LoteLinha {
  id: number;                   // id do lote/entrada
  numero_lote: string | null;
  data_validade: string | Date | null;
  saldo_total: number;
  saldo_disponivel: number;
  descricao: string;
  item_codigo?: string | number;
  produto_servico_id?: number;
  data_entrada?: string | Date | null;
}