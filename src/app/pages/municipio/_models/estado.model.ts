export interface Estado {
  id: number;
  sigla: string;
  nome: string;
  ativo: boolean;
  usuario_exclusao_id: number;
  data_exclusao: string;
}
