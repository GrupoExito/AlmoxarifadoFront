export interface DashboardKpis {
  almoxarifado_ativo_total: number;
  secretarias_atendidas_total: number;
  usuarios_total: number;
  solicitantes_total: number;
  itens_total: number;
  valor_total: number | null;
  valor_entrada_mes_total: number | null;
  valor_saida_mes_total: number | null;
}

export interface DashboardTopItem {
  produto_servico_id: number;
  descricao: string;
  qtd: number;
}

export interface DashboardItemVencimento {
  produto_servico_id: number;
  descricao: string;
  data_validade: string; // vem como ISO string
  quantidade: number;
}

export interface DashboardVencidosMes {
  mes: number; // 1..12
  qtd_vencidos: number;
}

export interface DashboardPedidoCompraSecretaria {
  gsecretaria_fundo_id: number;
  secretaria_descricao: string;
  secretaria_sigla: string;
  quantidade_pedidos: number;
  valor_pedidos: number;
}

export interface DashboardResponseDTO {
  kpis: DashboardKpis;
  itensMaisSolicitados: DashboardTopItem[];
  itensVencendo90Dias: DashboardItemVencimento[];
  itensVencidosAno: DashboardVencidosMes[];
  pedidosPorSecretaria: DashboardPedidoCompraSecretaria[];
}