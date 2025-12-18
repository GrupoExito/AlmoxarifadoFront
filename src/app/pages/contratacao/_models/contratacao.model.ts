export interface Contratacao {
  contratacao_id?: number;
  data_criacao?: string;
  gusuario_criacao_id: number;
  gexercicio_id: number;
  numero: string;
  objeto: string;
  data_autorizacao: string;
  data_abertura_proposta: string;
  data_encerramento_proposta: string;
  data_autuacao: string;
  flstatus_id: number;
  flsetor_id?: number;
  tipo_demanda_id: number;
  prazo_entrega: number;
  data_validade: string;
  data_parecer_juridico: string;
  data_homologacao: string;
  instrumento_convocatorio: number;
  valor_total?: number;
  pendencia?: number;
  criterio_julgamento: number;
  modalidade_compra_id: number;
  id?: number;
  id_contratacao_pncp?: number;
  numero_objeto?: string;
  modalidade_descricao?: string;
  regime_execucao?: number;
  sistema_registro_preco: boolean;
  tem_ata?: boolean;
  tem_pedido_compra?: number;
  tem_contrato?: number;
}

export interface ContratacaoFornecedorCertidao {
  id?: number;
  contratacao_id?: number;
  gfornecedor_id?: number;
  gtipo_certidao_id?: number;
  numero?: string;
  data_emissao?: string;
  data_validade?: string;
  descricao?: string;
}

export interface ContratacaoItem {
  codigo_item: number;
  item_descricao: string;
  unidade_medida_descricao: string;
  quantidade: number;
  preco_referencial: number;
  valor_credenciamento: number;
  codigoBB: number;
  qtd_casas_decimais_valor: number;
}

export enum EnumModalidadeContratacao {
  'Diálogo Competitivo' = 2,
  'Concurso' = 3,
  'Concorrência - Eletrônica' = 4,
  'Concorrência - Presencial' = 5,
  'Pregão - Eletrônico' = 6,
  'Pregão - Presencial' = 7,
  'Dispensa de Licitação' = 8,
  'Inexigibilidade' = 9,
  'Manifestação de Interesse' = 10,
  'Pré-qualificação' = 11,
  'Credenciamento' = 12,
  'Chamamento Público' = 51,
}

export enum EnumModalidadeCompraContratacao {
  'Licitacao' = 'Licitacao',
  'Dispensa' = 'Dispensa',
  'Inexigibilidade' = 'Inexigibilidade',
  'Credenciamento' = 'Credenciamento',
}

export interface ContratacaoHeader {
  quantidade_sd: number;
  quantidade_item: number;
  quantidade_anexos: number;
  quantidade_fornecedor: number;
  quantidade_historico: number;
  quantidade_dotacao: number;
  quantidade_lote: number;
  quantidade_contrato: number;
  quantidade_compra: number;
}

export interface ContratacaoParecerComissao {
  id?: number;
  contratacao_id: number;
  glei_fundamento_id: number;
  justificativa_comissao: string;
  informacoes_adicionais: string;
  data_parecer: string;
}

export interface ContratacaoPublicacao {
  id?: number;
  contratacao_id: number;
  numero_publicacao: string;
  gveiculo_publicacao_id: number;
  data_publicacao: string;
}

export interface ContratacaoEdital {
  id?: number;
  contratacao_id: number;
  numero_edital: number;
  gveiculo_publicacao_id: number;
  natureza: number;
  informacoes_adicionais: string;
  valor_estimado: string;
  data_abertura_proposta: string;
  data_certame: string;
}

export interface ContratacaoAviso {
  id?: number;
  contratacao_id: number;
  local_licitacao: string;
  informacoes_adicionais: string;
  data_aviso: string;
}

export interface ContratacaoParecerContabil {
  id?: number;
  contratacao_id: number;
  descricao_parecer: string;
  informacoes_adicionais: string;
  data_parecer: string;
}

export interface ListarContratacaoItemVencedor {
  id: number;
  quantidade: number;
  valor: number;
  fornecedor_descricao: string;
  codigo_item: number;
  item_descricao: string;
  unidade_medida_descricao: string;
  gfornecedor_id: number;
  marca_item: string;
  descricao_lote: string;
  item_id_descricao: string;
}
