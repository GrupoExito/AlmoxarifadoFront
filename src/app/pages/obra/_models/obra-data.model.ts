import { Pessoa } from '@pages/pessoa/_models/pessoa.model';
import { Obra } from './obra.model';
import { Contrato } from '@pages/contrato/_models/contrato.model';
import { TceQualificacaoProfissional } from '@pages/tce-qualificacao-profissional/_models/tce-qualificacao-profissional.model';
import { TceSetorBeneficiado } from '@pages/tce-setor-beneficiado/_models/tce-setor-beneficiado.model';
import { TceTipoObra } from '@pages/tce-tipo-obra/_models/tce-tipo-obra.model';
import { TceTipoServico } from '@pages/tce-tipo-servico/_models/tce-tipo-servico.model';



export interface ObraData {

  tceQualificacaoProfissional: TceQualificacaoProfissional[];
  tceSetorBeneficiado: TceSetorBeneficiado[];
  tceTipoObra: TceTipoObra[];
  tceTipoServico: TceTipoServico[];
  obra: Obra;
  pessoas: Pessoa[];
  contrato: Contrato[];
 
}

export interface ObraDataEtapasHeader {
  id: number;
  aQuantidade: number;
}

