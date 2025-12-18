export interface ProdutoServico {
  id?: number;
  descricao: string;
  unidade_medida_id: number;
  valor_referencia: number;
  qtd_casas_decimais_quantidade: number;
  qtd_casas_decimais_valor: number;
  tipo_de_produto_servico_id: number;
  ativo_almoxarifado?: boolean;
  descricao_almoxarifado?: string;
  unidade_medida_almoxarifado_id?: number;
  qtde_do_principal?: number;
  confirmado?: boolean;
  usadataValidade?: boolean;
  codigobb?: number;
  mercadoriabb?: number;
  usalotefabricacao?: boolean;
  unidade_medida_descricao?: string;
  unidade_medida_sigla?: string;
  tipo_produto_descricao?: string;
  unidade_medida_almoxarifado_descricao?: string;
  codigo_barra?: string;
  ativo?: boolean;
  usuario_exclusao_id?: number;
  data_exclusao?: string;
  id_descricao?: string;
  id_und_medida_descricao?: string;
  quantidade_total?: number;
  quantidade_solicitada?: number;
  quantidade_entrada?: number;
  saldo?: number;
  valor?: number;
  unidade_medida_fracionamento_id?: number;
  sigla_unidade_medida_fracionamento?: string;
    produto_servico_id?: number;
    sigla_unidade_medida?: string;
		unidade_medida_fracionada_id?: number;
		quantidade_fracionada?: number;
    quantidade_pedido?: number;
		saldo_pedido?: number;
		quantidade_entrada_atual?: number;
    valor_unitario?: number;
}

export interface ProdutoServicoContratacao {
  numero: string;
  gexercicio_id: string;
  descricao_modalidade: string;
  objeto: string;
  descricaoresumida: string;
  razao_social: string;
  quantidade_licitada: number;
  quantidade_aditivada: number;
}

export interface ProdutoServicoCompras {
  id: number;
  ano_pedido: number;
  secretaria_pedido: string;
  ano_secretaria: number;
  secretaria_sd: string;
  razao_social: string;
  quantidade: number;
}

export interface ProdutoServicoSaldo {
  id: number;
  ano: number;
  secretaria: string;
  setor: string;
  razao_social: string;
  quantidade_licitada: number;
  saldo: number;
}

export interface ProdutoServicoEstoqueAlmoxarifado {
  id?: number;
  id_item?: number;
  almoxarifado_id: number;
  produto_servico_id: number;
  estoque_minimo: number;
  descricao_almoxarifado?: string;
  descricao?: string;
  estoque_atual?: string;
}