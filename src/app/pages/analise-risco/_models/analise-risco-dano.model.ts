export interface AnaliseRiscoDano {
  id?: number;
  analise_risco_id: number;
  analise_risco_risco_id?: number;
  fase: number;
  descricao: string;
  acao_preventiva_descricao?: string;
  analise_risco_preventiva_id?: number;
  acao_preventiva_responsavel?: string;
  acao_contingencia_descricao?: string;
  analise_risco_contingencia_id?: number;
  acao_contingencia_responsavel?: string;
}
