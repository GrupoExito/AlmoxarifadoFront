export interface AutenticadorArquivoAssinatura {
  id: number;
  autenticador_arquivo_id: string;
  usuario_id: number;
  data_assinatura: Date;
  path: string;
  hash: string;
  usuario_nome?: number;
  codigo_verificador?: string;
}
