import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeiFundamento } from '../_models/lei-fundamento-model';
import { VeiculoPublicacao } from '../_models/veiculo-publicacao.model';
import {
  Contratacao,
  ContratacaoAviso,
  ContratacaoEdital,
  ContratacaoHeader,
  ContratacaoItem,
  ContratacaoParecerComissao,
  ContratacaoParecerContabil,
  ContratacaoPublicacao,
  ListarContratacaoItemVencedor,
} from '../_models/contratacao.model';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { Contrato } from '@pages/contrato/_models/contrato.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { LinhaProcesso, LinhaTempoAno } from '../_models/linhatempo.model';

@Injectable({
  providedIn: 'root',
})
export class ContratacaoService {
  baseURL = `${environment.apiLegacyUrl}/contratacao`;
  public contratacaoDataEtapasHeader = new BehaviorSubject<Partial<ContratacaoHeader> | null>(null);
  dataEtapasHeader$ = this.contratacaoDataEtapasHeader.asObservable();
  constructor(private http: HttpClient) {}

  listarContratacaoSecretaria(contratacao_id: number): Observable<{ gsecretaria_fundo_id: number }[]> {
    return this.http.get<{ gsecretaria_fundo_id: number }[]>(`${this.baseURL}/secretarias/${contratacao_id}`);
  }

  listarTodos(): Observable<Contratacao[]> {
    return this.http.get<Contratacao[]>(this.baseURL);
  }

  listarTodosLeiFundamento(): Observable<LeiFundamento[]> {
    return this.http.get<LeiFundamento[]>(`${this.baseURL}/LeiFundamento`);
  }

  listarTodosVeiculoPublicacao(): Observable<VeiculoPublicacao[]> {
    return this.http.get<VeiculoPublicacao[]>(`${this.baseURL}/VeiculoPublicacao`);
  }

  listarItensComPrecoReferencial(contratacao_id: number): Observable<ContratacaoItem[]> {
    return this.http.get<ContratacaoItem[]>(`${this.baseURL}/itens/${contratacao_id}`);
  }

  listarContratacaoItensVencedor(contratacao_id: number): Observable<ListarContratacaoItemVencedor[]> {
    return this.http.get<ListarContratacaoItemVencedor[]>(`${this.baseURL}/itens/vencedor/${contratacao_id}`);
  }

  consultarHeader(contratacao_id: number): Observable<ContratacaoHeader> {
    return this.http.get<ContratacaoHeader>(`${this.baseURL}/quantidade/${contratacao_id}`);
  }

  setEtapasHeader(dataEtapasHeader: Partial<ContratacaoHeader> | null) {
    this.contratacaoDataEtapasHeader.forEach((data) => {
      if (data && dataEtapasHeader) {
        Object.keys(data).forEach((props) => {
          if (!dataEtapasHeader.hasOwnProperty(props)) {
            dataEtapasHeader[props as keyof ContratacaoHeader] = data[props as keyof ContratacaoHeader];
          }
        });
      }
    });

    this.contratacaoDataEtapasHeader.next(dataEtapasHeader);
  }

  listarContratacaoContratos(contratacao_id: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseURL}/contratos/${contratacao_id}`);
  }

  filtrarContratacoes(parametroFiltro: any): Observable<Contratacao[]> {
    return this.http.get<Contratacao[]>(`${this.baseURL}/filtrar`, {
      params: parametroFiltro,
    });
  }

  filtrarContratacaoFornecedorVencedor(parametroFiltro: any): Observable<Contratacao[]> {
    return this.http.get<Contratacao[]>(`${this.baseURL}/filtrar`, {
      params: parametroFiltro,
    });
  }

  listarStatusFluxo(): Observable<StatusFluxo[]> {
    return this.http.get<StatusFluxo[]>(`${environment.apiLegacyUrl}/shared/statusfluxo`);
  }

  salvarContratacaoParecerComissao(
    contratacaoParecerComissao: ContratacaoParecerComissao
  ): Observable<ContratacaoParecerComissao> {
    return this.http.post<ContratacaoParecerComissao>(`${this.baseURL}/parecercomissao`, contratacaoParecerComissao);
  }

  consultarContratacaoParecerComissao(contratacao_id: number): Observable<ContratacaoParecerComissao> {
    return this.http.get<ContratacaoParecerComissao>(`${this.baseURL}/parecercomissao/${contratacao_id}`);
  }

  salvarContratacaoPublicacao(contratacaoPublicacao: ContratacaoPublicacao): Observable<ContratacaoPublicacao> {
    return this.http.post<ContratacaoPublicacao>(`${this.baseURL}/publicacao`, contratacaoPublicacao);
  }

  consultarContratacaoPublicacao(contratacao_id: number): Observable<ContratacaoPublicacao> {
    return this.http.get<ContratacaoPublicacao>(`${this.baseURL}/publicacao/${contratacao_id}`);
  }

  listarContratacaoPublicacoes(contratacao_id: number): Observable<ContratacaoPublicacao[]> {
    return this.http.get<ContratacaoPublicacao[]>(`${this.baseURL}/publicacoes/${contratacao_id}`);
  }

  salvarContratacaoEdital(contratacaoEdital: ContratacaoEdital): Observable<ContratacaoEdital> {
    return this.http.post<ContratacaoEdital>(`${this.baseURL}/edital`, contratacaoEdital);
  }

  consultarContratacaoEdital(contratacao_id: number): Observable<ContratacaoEdital> {
    return this.http.get<ContratacaoEdital>(`${this.baseURL}/edital/${contratacao_id}`);
  }

  salvarContratacaoAviso(contratacaoAviso: ContratacaoAviso): Observable<ContratacaoAviso> {
    return this.http.post<ContratacaoAviso>(`${this.baseURL}/aviso`, contratacaoAviso);
  }

  consultarContratacaoAviso(contratacao_id: number): Observable<ContratacaoAviso> {
    return this.http.get<ContratacaoAviso>(`${this.baseURL}/aviso/${contratacao_id}`);
  }

  salvarContratacaoParecerContabil(
    contratacaoParecerContabil: ContratacaoParecerContabil
  ): Observable<ContratacaoParecerContabil> {
    return this.http.post<ContratacaoParecerContabil>(`${this.baseURL}/parecercontabil`, contratacaoParecerContabil);
  }

  consultarContratacaoParecerContabil(contratacao_id: number): Observable<ContratacaoParecerContabil> {
    return this.http.get<ContratacaoParecerContabil>(`${this.baseURL}/parecercontabil/${contratacao_id}`);
  }

  listarHistoricoLinhaTempo(contratacao_id: number): Observable<LinhaTempoAno[]> {
    return this.http.get<LinhaTempoAno[]>(`${this.baseURL}/linhatempo/${contratacao_id}`);
  }

  listarHistoricoLinhaProcesso(contratacao_id: number): Observable<LinhaProcesso> {
    return this.http.get<LinhaProcesso>(`${this.baseURL}/linhaprocesso/${contratacao_id}`);
  }

  consultarContratacaoDashboard(): Observable<{
    licitacao: number;
    credenciamento: number;
    dispensa: number;
    inexigibilidade: number;
  }> {
    return this.http.get<{ licitacao: number; credenciamento: number; dispensa: number; inexigibilidade: number }>(
      `${this.baseURL}/contratacaodashboard`
    );
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  sincronizarContratacaoPNCP(contratacao_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/pncp/contratacao/${contratacao_id}`);
  }

  sincronizarContratacaoBLL(contratacao_id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiLegacyUrl}/integradorbncbll/envio/${contratacao_id}`, contratacao_id);
  }

  sincronizarContratacaoLicitanet(contratacao_id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiLegacyUrl}/licitanet/${contratacao_id}`, contratacao_id);
  }

  sincronizarContratacaoBB(contratacao_id: number): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/zip',
      }),
    };

    return this.http.get<Blob>(`${environment.apiLegacyUrl}/bancobrasil/exportar/${contratacao_id}/127`, httpOptions);
  }
}
