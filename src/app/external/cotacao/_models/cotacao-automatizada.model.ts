export interface CotacaoAutomatizada {
  id: number;
  nome_item: string;
  quantidade: string;
  unidade: string;
  valor: string;
  uf: string;
  data_homologacao: string;
  data_id_produto: string;
  data_id_fontePesquisa: string;
  data_formula: string;
  data_formula_invalida: string;
  data_id_indice: string;
  data_cotacao: string;
  gproduto_servico_id: number;
  selecionado: boolean;
}
