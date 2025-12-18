import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { TipoObjeto } from './tipo-objeto.model';
import { SolicitacaoDespesa } from './solicitacao-despesa.model';

export interface SDData {
  solicitacaoDespesa: SolicitacaoDespesa;
  secretarias: SecretariaFundo[];
  exercicios: Exercicio[];
  pessoas: Pessoa[];
  setores: Setor[];
  tiposDemanda: TipoDemanda[];
  tiposObjeto: TipoObjeto[];
  sdTiposObjeto: number[];
  membrosPlanejamento: number[];
  permissaoStatus: number[];
}

export interface SDDataEtapasHeader {
  quantidade_anexos: number;
  quantidade_itens: number;
  quantidade_dotacao: number;
  quantidade_historico: number;
  cotacao_id: number;
  cotacao_status: number;
  processo_adm_id: number;
  processo_adm_status: number;
  modalidade_compra: string;
  contratacao_id: number;
  contratacao_status: number;
  termo_referencia_id: number;
  quantidade_documentos_assinados: number;
  valor_cotacao_dfd: number;
}
