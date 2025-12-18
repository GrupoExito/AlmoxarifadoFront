export interface ObraResponsavelTecnico {
    id?: number;
    obra_id: number;
    numero_documento?: string;
    tipo_vinculo?: number;
    data_emissao?: string;
    etapa?: number;
    responsavel_nome?: string;
    responsavel_cpf?: string;
    responsavel_crea?: string;
    tce_qualificacao_profissional_id?: number;
    descricao_qualificacao?: string;
    etapa_descricao?:string;
    tipo_vinculo_descricao?:string;

}
  
