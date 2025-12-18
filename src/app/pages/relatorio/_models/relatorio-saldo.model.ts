export interface RelatorioSaldoProdutoSintetico {
  contratacao_gexercicio_id: number;
  contratacao_modalidade_id: number;
  contratacao_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_licitacao_vencida?: number;
  saldo_minimo_menor_igual?: number;
}

export interface RelatorioSaldoProdutoAnalitico {
  contratacao_gexercicio_id: number;
  contratacao_modalidade_id: number;
  contratacao_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_licitacao_vencida?: number;
}

export interface RelatorioSaldoProdutoSinteticoSecretaria {
  contratacao_gexercicio_id: number;
  contratacao_modalidade_id: number;
  contratacao_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_licitacao_vencida?: number;
}

export interface RelatorioSaldoProdutoSinteticoFornecedor {
  contratacao_gexercicio_id: number;
  contratacao_modalidade_id: number;
  contratacao_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_licitacao_vencida?: number;
}

export interface RelatorioSaldoProdutoSinteticoLicitacao {
  contratacao_gexercicio_id: number;
  contratacao_modalidade_id: number;
  contratacao_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_licitacao_vencida?: number;
}

export interface RelatorioSaldoContratoAnalitico {
  exercicio: number;
  secretaria: string;
  secretaria_selecionadas: number[];
  data_inicial: string;
  data_final: string;
  modalidade: string;
  modalidade_selecionados: number[];
}

export interface RelatorioSaldoContratoSinteticoSecretaria {
  contrato_gexercicio_id: number;
  contrato_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_contrato_vencido?: number;
}

export interface RelatorioSaldoContratoSintetico {
  contrato_gexercicio_id: number;
  contrato_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_contrato_vencido?: number;
}

export interface RelatorioSaldoContratoSinteticoFornecedor {
  contrato_gexercicio_id: number;
  contrato_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  situacao_saldo: number;
  saldo_minimo_percentual?: number;
  considerar_contrato_vencido?: number;
}

export interface RelatorioSaldoContratoSinteticoContrato {
  contrato_gexercicio_id: number;
  contrato_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  situacao_saldo: number;
  saldo_minimo_percentual?: number;
  considerar_contrato_vencido?: number;
}

export interface RelatorioSaldoContratoPorValor {
  contrato_gexercicio_id: number;
  contrato_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  situacao_saldo: number;
  saldo_minimo_percentual?: number;
  considerar_contrato_vencido?: number;
}


export interface RelatorioSaldoAtaSintetico {
  contrato_gexercicio_id: number;
  ata_id: number;
  sd_gexercicio_id: number;
  sd_gsecretaria_fundo_id: number;
  sd_id: number;
  fornecedor_id: number;
  tipo_produto_servico_id: number;
  produto_servico_id: number;
  com_saldo: number;
  considerar_ata_vencida?: number;
}
