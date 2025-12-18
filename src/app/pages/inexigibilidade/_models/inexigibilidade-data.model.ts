import { ComissaoLicitacao } from '@pages/comissao-licitacao/_models/comissao-licitacao.model';
import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { ContratacaoInexigibilidade } from './contratacao-inexigibilidade.model';
import { LeiFundamento } from '../../contratacao/_models/lei-fundamento-model';
import { VeiculoPublicacao } from '@pages/veiculo-publicacao/_models/veiculo-publicacao.model';
import { ModalidadeCompra } from '@pages/modalidade-compra/_models/modalidade-compra.model';
import { AmparoLegal } from '@pages/Amparo-Legal/_models/amparo-legal.model';

export interface InexigibilidadeData {
  inexigibilidade: ContratacaoInexigibilidade;
  exercicios: Exercicio[];
  pessoas: Pessoa[];
  secretarias: SecretariaFundo[];
  modalidades: ModalidadeCompra[];
  tiposDemanda: TipoDemanda[];
  comissaoDispensas: ComissaoLicitacao[];
  leiFundamentos: LeiFundamento[];
  veiculoPublicacoes: VeiculoPublicacao[];
  amparoLegal: AmparoLegal[];
  permissaoStatus: number[];
  usaLote: boolean;
}
