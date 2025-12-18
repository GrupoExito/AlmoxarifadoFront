export interface ConvenioSituacao {
    id?: number;
    convenio_id: number; 
    data_criacao: string;
    situacao: number;
    situacao_descricao?: string;
    descricao_justificativa: string;
}
  