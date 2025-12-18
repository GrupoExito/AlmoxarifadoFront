export interface Log {
  id: number;
  usuario_id: number;
  usuario_nome: string;
  db_cliente: string;
  rota: string;
  metodo: string;
  body: string;
  data: string;
  ip: string;
  funcao: string;
  error: boolean;
  error_message: string;
  observacao: string;
  dados_origem: string;
}
