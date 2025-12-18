import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { VeiculoPublicacao } from '@pages/veiculo-publicacao/_models/veiculo-publicacao.model';
import { Convenio } from './convenio.model';
import { ConvenioSituacao } from './convenio-situacao.model';


export interface ConvenioData {
  convenio: Convenio;
  exercicios: Exercicio[];
  pessoas: Pessoa[];
  veiculoPublicacoes: VeiculoPublicacao[];
}

export interface ConvenioDataEtapasHeader {
  id: number;
  aQuantidade: number;
}

export interface ConvenioSituacaoData {
  convenioSituacao: ConvenioSituacao;
 }