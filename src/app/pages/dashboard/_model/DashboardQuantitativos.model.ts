export interface DashboardQuantitativos {
  ordem: number;
  valor: number;
  descricao: string;
}

export interface DashboardQuadrimestreQuantitativos {
  mes: string;
  qtd: number;
  sigla: string;
}

export interface DadosColumns {
  data: number[];
  name: string;
}

export interface DashboardUltimosProcessosContratacoes {
  id?: number;
  contrato_numero?: string;
  categoria_item?: number;
  gexercicio_id?: number;
  secretaria_descricao?: string;
  data_criacao?: string;
  status_descricao?: string;
  numero?: string;
  objeto?: string;
  valor_total?: number;
  modalidade_compra_id?: number;
  modalidade_compra_descricao?: string;
}

export enum CategoriaItem {
  Material = 1,
  Servico = 2,
  Obras = 3,
  ServicosDeEngenharia = 4,
  SolucoesDeTIC = 5,
  LocacaoDeImoveis = 6,
  AlienacaoConcessaoPermissao = 7,
  ObrasEServicosDeEngenharia = 8,
}

export interface DashboardUltimosProcessosContratos {
  id?: number;
  numero?: string;
  fornecedor?: string;
  objeto?: string;
  tipo_contrato_id?: number;
  status_descricao?: string;
}

export interface DashboardUltimosPedidos {
  id?: number;
  descricao_secretaria?: string;
  objeto?: string;
  numero_contrato?: string;
  contrato_id?: number;
  tipo_contrato_id?: number;
  status_descricao?: string;
}

export interface DashboardPedidoCompraSecretaria {
  gsecretaria_fundo_id: number;
  secretaria_descricao: string;
  secretaria_sigla: string;
  quantidade_pedidos: number;
  valor_pedidos: number;
}

export enum NaturezaContrato {
  Servicos = 8,
  Transportes = 12,
  Materiais = 13,
  Alugueis = 15,
  Diarias = 16,
  Pessoal = 17,
  Outros = 0,
}

export const NATUREZA_LABELS = {
  [NaturezaContrato.Servicos]: 'Serviços',
  [NaturezaContrato.Transportes]: 'Transportes',
  [NaturezaContrato.Materiais]: 'Materiais',
  [NaturezaContrato.Alugueis]: 'Aluguéis',
  [NaturezaContrato.Diarias]: 'Diárias',
  [NaturezaContrato.Pessoal]: 'Pessoal',
  [NaturezaContrato.Outros]: 'Outros',
};

export interface ItemContrato {
  id: number;
  classificacao: number;
  data_validade: string;
  valor_total: number;
}

export interface MesContrato {
  items: ItemContrato[];
}
