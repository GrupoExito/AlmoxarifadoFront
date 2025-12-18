export interface ExportacaoDocumentoCotacao {
    exportacao_id: number;
    exportacao_nome: string;
    cotacao_id: number;
  }
  
  export enum DocumentoExportacaoCotacao {
    'Exportar apenas os itens',
    'Exportação preço referencial médio',
  }