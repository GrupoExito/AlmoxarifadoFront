export interface Cliente {
  id: number;
  nome: string;
  grupousuario_id: number;
}

export interface ClienteToken {
  token: string;
  tokenPermissao: string;
}

export interface ClienteMunicipio {
   id?: number;
  nome: string;
  grupousuario_id?: number;
  db_cliente: string;
}
