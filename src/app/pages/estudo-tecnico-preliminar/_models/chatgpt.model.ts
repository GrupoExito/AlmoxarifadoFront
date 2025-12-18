export interface ChatGpt {
  objeto?: string;
  solucao?: string;
  recomendacao?: string;
  ids: number[];
}

export interface ChatGptAr {
  ids: number[];
  objeto?: string;
  unidade?: string;
  orgao?: string;
}

export enum enumPerguntasETP {
  'necessidade_contratacao' = 3,
  'requisitos_contratacao' = 4,
  'levantamento_mercado' = 5,
  'descricao_solucao' = 6, // 7, 8
  'justificativa_parcelamento' = 9,
  'contratacoes_correlatas' = 10,
  //'demonstracao_alinhamento' = 9,
  'resultados_pretendidos' = 11,
  'providencias' = 12,
  'impactos_ambientais' = 13,
  //'posicionamento_conclusivo' = 14,
}

export interface ResponseChatGpt {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_Fingerprint: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface MessageResponse {
  role: string;
  content: string;
}

export interface Choice {
  index: number;
  message: MessageResponse;
  logprobs: any; // Se for sempre null, você pode definir o tipo adequado aqui
  finish_Reason: string;
}
