export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}

export interface AuthToken {
  id: number;
  cliente_db: string;
  cliente_id: string;
  cliente_nome: string;
  email: string;
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  pwd: string;
  unique_name: string;
  cnpj_orgao: string;
}

export interface PermissionToken {
  exp: number;
  iat: number;
  nbf: number;
  permission: string;
}

export interface ControleAcesso {
  pagina_id: number;
  pagina_nome: string;
  permissao_id: number;
  permissao_nome: string;
}
