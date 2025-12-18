export interface TermoReferencia {
  id?: number;
  gexercicio_id?: number;
  data_tr?: string;
  justificativa?: string;
  objeto?: string;
  prazo_entrega_dias?: number;
  forma_pagamento?: string;
  prazo_pagamento?: string;
  modelo_tr_id?: number;
  termo_referencia?: string;
  flstatus_id?: number;
  data_hora_criacao?: string;
  flsetor_id?: number;
  status?: string;
  numero_pa?: string;
}

export interface TermoReferenciaItens {
  gproduto_servico_id: number;
  preco_mediano: number;
  quantidade: number;
  item_descricao: string;
  sigla: string;
}

export interface ImpressaoDocumentoTermoReferenciaDTO {
  impressao_id: number;
  impressao_nome: string;
  tr_id: number;
}
