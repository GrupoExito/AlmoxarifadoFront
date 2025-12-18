export interface ObraLicencaAmbiental {
    id?: number;
    obra_id?: number;
    tipo?: number;
    empreendimento: string;
    endereco: string;
    interessado?: string;
    compensacao?: number;
    valor_compensacao?: number;
    tipo_compensacao?: string;
    compensacao_descricao?: string;
    tipo_descricao?:string;
   
}
  
