export interface Usuario {
  id?: number;
  login?: string;
  password?: string;
  nome?: string;
  telefone?: string;
  ativo?: boolean;
  email?: string;
  cliente_id?: number;
  perfil?: string;
  perfil_id?: number;
  secretarias?: number[];
  dataLimiteAcesso?: string;
  repetirSenha?: string;
  path_assinatura?: string;
}

export interface VincularUsuarioClienteDTO {
  municipio_id: number;
  usuario_id: number;
  grupousuario_id: number;
}
