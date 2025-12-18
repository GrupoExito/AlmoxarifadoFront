export interface AtaItem {
  id?: number;
  ata_id: number;
  gproduto_servico_id: number;
  quantidade: number;
  valor: number;
  data_criacao?: string;
  descricao_item?: string;
  descricao_secretaria?: string;
}

export interface AtaItemAdicionar {
  ata_id: number;
  gproduto_servico_id: number;
  sd_id: number;
  quantidade_total: number;
  quantidade_saldo: number;
  valor: number;
  descricao_item?: string;
}
