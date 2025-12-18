export interface ImpressaoDocumentoPedidoCompra {
  impressao_id: number;
  impressao_nome: string;
  pedido_compra_id: number;
}

export enum DocumentoPedidoCompra {
  'Espelho do Pedido',
  'Solicitação de Empenho',
  'Solicitação de Liquidação',
  'Impressão do Pedido de Compra',
  'Ofício de Fornecimento',
  'Ordem de Fornecimento',
}

export interface RelatorioPedidoCompraSecretariaSintetico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  produto_selecionado: number;
  produto_descricao?: string;
  contratacao: string;
  contratacao_selecionadas: number[];
}

export interface RelatorioPedidoCompraSetorSintetico {
  exercicio: number;
  setor: string;
  setores_selecionados: number[];
  data_inicial: string;
  data_final: string;
  fornecedor: string;
  fornecedores_selecionados: number[];
  produto_selecionado: number;
  produto_descricao?: string;
}

export interface RelatorioPedidoCompraSecretariaAnalitico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  produto_selecionado: number;
  produto_descricao?: string;
  contratacao: string;
  contratacao_selecionadas: number[];
}

export interface RelatorioPedidoCompraModalidade {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
}

export interface RelatorioPedidoCompraFornecedorSintetico {
  exercicio: number;
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  secretaria: string;
  secretaria_selecionado: number[];
}

export interface RelatorioPedidoCompraFornecedorAnalitico {
  exercicio: number;
  fornecedor: string;
  fornecedor_selecionado: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  secretaria: string;
  secretaria_selecionado: number[];
}

export interface RelatorioPedidoCompraLicitacaoSintetico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  contratacao: string;
  contratacao_selecionadas: number[];
}

export interface RelatorioPedidoCompraLicitacaoAnalitico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
  contratacao: string;
  contratacao_selecionadas: number[];
}

export interface RelatorioPedidoCompraContratacao {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
}

export interface RelatorioPedidoCompraContratoSintetico {
  exercicio: number;
  contrato: string;
  contrato_selecionados: number[];
  data_inicial: string;
  data_final: string;
  // modalidade: string;
  // modalidade_selecionados: number[];
}

export interface RelatorioPedidoCompraSaldoContrato {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
}

export interface RelatorioPedidoCompraSaldoContratacao {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
}

export interface RelatorioPedidoCompraItem {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionadas: number[];
  produto: string;
  produto_selecionado: number[];
  produto_descricao?: string;
}