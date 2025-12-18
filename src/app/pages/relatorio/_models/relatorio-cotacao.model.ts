export interface ImpressaoDocumentoCotacao {
  impressao_id: number;
  impressao_nome: string;
  cotacao_id: number;
}

export enum DocumentoCotacao {
  'Cotação de Preço',
  'Cotação de Preços sem Marca',
  'Quantitativo Consolidado',
  'DFD Consolidada com Preço Médio Referencial',
  'DFD Consolidada com Preço Mediano Referencial',
  'DFD por Secretaria com Preço Médio Referencial',
  'Preço Referencial - Médio',
  'Preço Referencial - Mediano',
  'Preço Referencial - Mínimo',
  'Cotação de Preço Por Lote',
  'Anexo 1',
  'Relatório de Pesquisa de Preços',
}
