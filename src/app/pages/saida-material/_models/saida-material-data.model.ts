import { Almoxarifado } from '@pages/almoxarifado/_models/almoxarifado.model';
import { SecretariaFundo } from '@pages/secretaria-fundo/_models/secretaria-fundo.model';
import { SaidaMaterial } from './saida-material.model';
import { Setor } from '@pages/setor/_models/setor.model';
import { SolicitanteMaterial } from '@pages/solicitante-material/_models/solicitante-material.model';
import { CentroCusto } from '@pages/centro-custo/_models/centro-custo.model';
import { UnidadeExterna } from '@pages/unidade-externa/_models/unidade-externa.model';
import { Cidadao } from '@pages/cidadao/_models/cidadao.model';

export interface SMData {
  saidaMaterial: SaidaMaterial;
  secretarias: SecretariaFundo[];
  almoxarifados: Almoxarifado[];
  solicitantes: SolicitanteMaterial[];
  setores: Setor[];
  centrosCusto: CentroCusto[];
  unidadesExterna: UnidadeExterna[];
  //cidadaos: Cidadao[];
}

export interface SMDataEtapasHeader {
  quantidade_itens: number;
  quantidade_historico?: number;
  valorTotal: number;
}
