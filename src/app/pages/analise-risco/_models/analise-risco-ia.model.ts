export class AcaoDTO {
  descricao: string;
  responsavel: string;
}

export class AcoesDTO {
  preventiva: AcaoDTO;
  corretiva: AcaoDTO;
}

export class RiscoDTO {
  descricao: string;
  probabilidade: string;
  impacto: string;
  dano: string;
  acoes: AcoesDTO;
}

export class FaseDTO {
  ordem: number;
  nome: string;
  risco: RiscoDTO;
}

export class AnaliseRiscoIADTO {
  fases: FaseDTO[];
}

export class CriarAnaliseRiscoIA {
  risco: CriarArRiscoIA;
  dano: CriarArDanoIA;
  acaoPreventiva: CriarArAcaoPreventivaIA;
  acaoContingencia: CriarArAcaoContingenciaIA;
}

export class CriarArRiscoIA {
  fase: number;
  descricao_risco: string;
  analise_risco_id: number;
  probabilidade: number;
  impacto: number;
}

export class CriarArDanoIA {
  fase: number;
  descricao_dano: string;
  analise_risco_id: number;
  risco_id?: number;
}

export class CriarArAcaoPreventivaIA {
  fase: number;
  responsavel_acao_preventiva: string;
  descricao_acao_preventiva: string;
  dano_id?: number;
  risco_id?: number;
}

export class CriarArAcaoContingenciaIA {
  fase: number;
  responsavel_acao_contingencia: string;
  descricao_acao_contingencia: string;
  dano_id?: number;
  risco_id?: number;
}
