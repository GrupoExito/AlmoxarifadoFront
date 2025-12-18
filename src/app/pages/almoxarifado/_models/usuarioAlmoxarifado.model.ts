export interface UsuarioAlmoxarifado {
  id?: number;
  usuario_id: number;
  almoxarifado_id: number;
  autorizador: boolean;
  usuario_nome?: string;
  almoxarifado_descricao?: string;
}