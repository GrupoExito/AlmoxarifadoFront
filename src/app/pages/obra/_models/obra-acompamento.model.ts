export interface ObraAcompanhamento {
    id?: number;
    obra_id: number;
    parcela: number;
    mes_referencia: number;
    valor_executado: number;
    descricao_servico?: string;
    data_vistoria: string;
    situacao: number;
    responsavel_nome: string;
    responsavel_cpf: string;
    situacao_descricao?: string;
   
}
  
