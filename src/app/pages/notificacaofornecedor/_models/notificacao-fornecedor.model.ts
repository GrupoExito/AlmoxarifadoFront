export interface NotificacaoFornecedor {
  id?: number;
  data_notificacao: Date;
  data_cadastro?: Date;
  usuario_id?: number;
  fornecedor_id: number;
  observacao: string;
  fantasia?: string;
}