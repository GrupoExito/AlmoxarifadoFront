export interface Convenio {
  id?: number;
  gexercicio_id: number;
  numero_termo: string;
  data_celebracao: string;
  data_inicio_vigencia: string;
  data_fim_vigencia: string;
  data_assinatura: string;
  data_publicacao: string;
  modalidade: number;
  objeto: string;
  gveiculo_publicacao_id: number;
  cnpj_concedente: string;
  cnpj_convenente: string;
  nome_convenente: string;
  valor_global: number;
  valor_repasse: number;
  valor_contrapartida: number;
  ato_publicacao: string;
  veiculo_publicacao?:string;
 
}
