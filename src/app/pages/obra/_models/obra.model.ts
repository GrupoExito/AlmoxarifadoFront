export interface Obra {
  id?: number;
  contrato_id: number;
  regime_execucao: number;
  prazo_execucao: number;
  data_inicio_prevista: string;
  data_fim_prevista: string;
  tce_tipo_obra_id: number;
  tce_tipo_servico_id: number;
  tce_setor_beneficiado_id: number;
  tce_qualificacao_profissional_id: number;
  natureza_obra: number;
  executor_nome: string;
  executor_cnpj_cpf: string;
  endereco: string;
  cep: string;
  latitude: number;
  longitude: number;
  numero_cno: string;
  data_cadastro_cno: string;
  responsavel_nome: string;
  responsavel_registro_crea: string;
  responsavel_cpf: string;
  regime_execucao_descricao?: string;
  natureza_obra_descricao?: string;
  descricao_obra?: string;
  descricao_servico?: string;
 
}
