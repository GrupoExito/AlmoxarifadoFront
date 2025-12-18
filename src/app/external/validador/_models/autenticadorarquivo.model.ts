export interface AutenticadorArquivo {
  id:	string;
  codigo_verificador:	string;
  codigo_id: string;
  codigo_digito: string;
  path:	string;
  data_cadastro: Date;
  hash:	string;
  data_exclusao:	Date;
  tipo_arquivo:	string;
  usuario_id_exclusao:	number;
  cliente_id:	number;
}
