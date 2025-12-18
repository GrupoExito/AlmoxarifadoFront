import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { PlanejamentoContratacao } from './planejamento-contratacao.model';

export interface PlanejamentoContratacaoData {
  planejamentoContratacao: PlanejamentoContratacao;
  secretarias: SecretariaFundo[];
  exercicios: Exercicio[];
  pessoas: Pessoa[];
  setores: Setor[];
  tiposDemanda: TipoDemanda[];
  // permissaoStatus: number[];
}

export interface PcaDataEtapasHeader {
  quantidade_itens: number;
  quantidade_dotacao: number;
  quantidade_anexos: number;
  quantidade_historico: number;
  pca_id: number;
  pca_status: number;
  quantidade_objetos: number;
}
