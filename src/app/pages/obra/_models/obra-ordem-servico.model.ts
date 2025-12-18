export interface ObraOrdemServico {
    id?: number;
    obra_id: number;
    numero: string;
    descricao?: string;
    data_emissao: string;
    data_inicio: string;
    responsavel_nome: string;
    responsavel_cpf: string;
}
  