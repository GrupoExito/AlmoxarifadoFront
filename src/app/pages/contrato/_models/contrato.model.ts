export interface Contrato {
  id: number;
  numero: string;
  gexercicio_id: number;
  contratacao_id: number;
  gfornecedor_id: number;
  controle: number;
  data_assinatura: string;
  data_inicio: string;
  data_fim: string;
  objeto: string;
  valor: string;
  valor_mao_de_obra: number;
  modelo_documento_id: number | null;
  natureza: number;
  classificacao: number;
  indice: number;
  tipo_contrato_id: number;
  tipo_contrato_siga_siap: number;
  data_publicacao: string;
  gveiculo_publicacao_id: number;
  tem_garantia: number;
  tipo_garantia: number;
  data_inicio_garantia: string;
  data_fim_garantia: string;
  data_cancelamento: string;
  gusuario_cancelamento_id: number;
  tem_pagamento_antecipado: number;
  base_legal_pagamento_antecipado: string;
  tipo_processo_contratacao: number;
  pncp_tipo_contrato_id: number;
  ativo: number;
  data_exclusao: string;
  gusuario_exclusao_id: number;
  razao_social?: string;
  contrato_valor?: string;
  fornecedor_razao_social?: number;
  numero_fornecedor_obj_contrato?: string;
  flstatus_id: number;
  flsetor_id?: number;
  qtd_pedido_compra?: number;
  id_contrato_pncp?: number;
  fiscal_contrato_id?: number;
  contrato_origem_aditivado_id?: number;
  aditivado_renovacao?: boolean;
  numero_parcelas?: number;
  contratacao_numero?: number;
  contratacao_modalidade: number;
  data_validade_contrato: string;
  secretaria_numero_fornecedor_obj_contrato?: string;
  contrato_saldo?: number;
  prazo_entrega_dias?: number;
}

export interface ContratoSecretaria extends Contrato {
  gsecretaria_fundo_id: number;
  secretaria_descricao: string;
}

export interface TipoContrato {
  id: number;
  codigo: number;
  descricao: string;
  tribunal: number;
}

export interface ContratoHeader {
  quantidade_item?: number;
  quantidade_dotacao?: number;
  quantidade_aditivos?: number;
  quantidade_historico?: number;
  quantidade_pedido_compra?: number;
  quantidade_contratacao?: number;
  quantidade_anexo?: number;
}

export interface ContratoAcompanhamentoQuantidade {
  quantidade_30dias: number;
  quantidade_60dias: number;
  quantidade_90dias: number;
  quantidade_50porcento: number;
  quantidade_75porcento: number;
  quantidade_90porcento: number;
  quantidade_vigencia: number;
  quantidade_aditivado: number;
  quantidade_vencido: number;
}

export interface ContratoFornecedorCertidao {
  id?: number;
  contrato_id?: number;
  gfornecedor_id?: number;
  gtipo_certidao_id?: number;
  numero?: string;
  data_emissao?: string;
  data_validade?: string;
  descricao?: string;
}
