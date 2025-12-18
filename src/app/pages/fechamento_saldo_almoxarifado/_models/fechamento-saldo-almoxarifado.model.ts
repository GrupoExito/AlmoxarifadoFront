export interface FechamentoSaldoAlmoxarifado {
  id?: number;
  almoxarifado_id?: number;
  almoxarifado?: string;
  data_cadastro?: Date;
  data_fechamento: Date;
  usuario_id?: number;
  produto_servico_id?: number;
  valor_total?: number;
  mais_atual: boolean;
}