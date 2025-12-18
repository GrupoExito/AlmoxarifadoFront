export interface PedidoCompra {
  id: number;
  data_criacao: string;
  gusuario_criacao_id: number;
  gexercicio_id: number;
  gsecretaria_fundo_id: number;
  data_solicitacao: string;
  origem: EnumPedidoCompraOrigem;
  contrato_id: number;
  sd_id: number;
  ata_id: number;
  pedido_simplificado_fornecedor_id: number;
  ata_exercicio: number;
  data_final: string;
  numero_ata: string;
  objeto: string;
  gpessoa_responsavel_id: number;
  gsetor_entrega_id: number;
  local_entrega: string;
  prazo_entrega: number;
  endereco_entrega: string;
  forma_pgto: string;
  data_nota: string;
  numero_nota: string;
  protocolo: string;
  gsecretaria_fundo_fatura_id: number;
  gconta_bancaria_id: number;
  insere_almoxarifado: boolean;
  observacao: string;
  flstatus_id?: number;
  flsetor_id?: number;
  pendencia?: number;
  sd_exercicio?: number;
  contratacao_exercicio?: number;
  secretaria_sd?: number;
  contrato_exercicio?: number;
  fornecedor_razao_social: string;
  secretaria_descricao: string;
  secretaria_descricao_resumida: string;
  contrato_numero?: string;
  controle_contrato: number;
  contrato_valor: number;
  valor_total_pedido: number;
  numero_pa: string;
  sd_processo: string;
  pedido_compra_valor: number;
  pedido_quantidade_itens?: number;
  data_validade: string;
  pedido_informacao?: string;
  fonte_recurso_descricao?: string;
  local_entrega_id: number;
  qtd_assinatura_digitalizada?: number;
}

export interface PedidoCompraListarSD {
  contratacao_exercicio: number;
  secretaria_id: number;
  sd_exercicio: number;
}

export interface RetornoPedidoCompraListarSD {
  contratacao_id: number;
  sd_id: string;
  sd_exercicio: string;
  licitacao_exercicio: string;
  gsecretaria_fundo_id: string;
  sd_pa_objeto: string;
  objeto: string;
  flstatus_id: number;
  data_homologacao: string;
  data_validade: string;
}

export interface PedidoCompraDotacao {
  id?: number;
  pedido_compra_id: number;
  gdotacao_orcamentaria_id: number;
  codigo_item_da_despesa?: string;
  fonte_recurso_descricao?: string;
  fonte_recurso_id?: number;
  id_fonte_recurso?: string;
  item_despesa_descricao?: string;
  item_despesa_id?: number;
  numero_projeto_atividade?: string;
  orgao_descricao?: string;
  orgao_id?: number;
  secretaria_descricao?: string;
  projeto_atividade_descricao?: string;
  projeto_atividade_id?: number;
  unidade_orcamentaria?: number;
  valor?: string;
}

export interface PedidoCompraAssinaturaDigitalizadaUsuario {
  id: number;
  pedido_compra_id: number;
  usuario_id: number;
}

export interface PedidoCompraNota {
  id?: number;
  pedido_id?: number;
  numero_nota: string;
  data_nota: string;
  valor: number;
  total?: number;
}

export class FiltrarPedidoCompra {
  usando_filtro: boolean;
  exercicio: string;
  pedido_compra: string;
  contrato: string;
  secretaria: string;
  objeto: string;
  fornecedor: string;
  status: string;
  data_inicial: string;
  data_final: string;
  produto: number[];
  observacao: string;

  constructor() {
    this.usando_filtro = false;
    this.exercicio = '';
    this.pedido_compra = '';
    this.contrato = '';
    this.secretaria = '';
    this.objeto = '';
    this.fornecedor = '';
    this.status = '';
    this.data_inicial = '';
    this.data_final = '';
    this.produto = [];
    this.observacao = '';
  }
}

export enum EnumPedidoCompraOrigem {
  'Contrato' = 1,
  'DFD' = 2,
  'Ata' = 3,
  'Simplificado' = 4,
}
