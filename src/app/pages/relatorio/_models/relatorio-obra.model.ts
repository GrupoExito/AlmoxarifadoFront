export interface ImpressaoDocumentoObra {
    impressao_id: number;
    impressao_nome: string;
    obra_id: number;
  }
  
  export enum DocumentoObra {
    'Espelho do Contrato de Obra',
    'Listagem de Ordem De Serviço  de Obra',
    'Listagem de Acompanhamento de Obra',
    'Listagem de Medição de Obra',
    'Listagem de Responsabilidade Técnica de Obra',
    'Listagem de Licença Ambiental de Obra',
    
  }