import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlanejamentoContratacao } from '../_models/planejamento-contratacao.model';
import { PcaDataEtapasHeader, PlanejamentoContratacaoData } from '../_models/planejamento-contratacao-data.model';

@Injectable({
  providedIn: 'root',
})
export class PlanejamentoContratacaoService {
  private routeId: number | null = null;
  public pcaData = new BehaviorSubject<PlanejamentoContratacaoData | null>(null);
  public pcaDataEtapasHeader = new BehaviorSubject<Partial<PcaDataEtapasHeader> | null>(null);
  data$ = this.pcaData.asObservable();
  dataEtapasHeader$ = this.pcaDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/planejamentocontratacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PlanejamentoContratacao[]> {
    return this.http.get<PlanejamentoContratacao[]>(this.baseURL);
  }

  consultarPca(id: number): Observable<PlanejamentoContratacao> {
    return this.http.get<PlanejamentoContratacao>(`${this.baseURL}/${id}`);
  }

  // listarTodosParaApostilamento(): Observable<SolicitacaoDespesa[]> {
  //   return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/apostilamento`);
  // }

  consultarPcaQuantidade(id: number): Observable<PcaDataEtapasHeader> {
    return this.http.get<PcaDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(planejamentoContratacao: PlanejamentoContratacao): Observable<PlanejamentoContratacao> {
    return this.http.post<PlanejamentoContratacao>(`${this.baseURL}`, planejamentoContratacao);
  }

  editar(id: number, planejamentoContratacao: PlanejamentoContratacao): Observable<PlanejamentoContratacao> {
    return this.http.put<PlanejamentoContratacao>(`${this.baseURL}/${id}`, planejamentoContratacao);
  }

  // imprimirRelatorioPCAAnalitico(documento: any): Observable<ArrayBuffer> {
  //   return this.http.post(`${this.baseURL}/impressaopca/analitico`, documento, {
  //     responseType: 'arraybuffer',
  //   });
  // }

  // imprimirRelatorioPCASintetico(documento: any): Observable<ArrayBuffer> {
  //   return this.http.post(`${this.baseURL}/impressaopca/sintetico`, documento, {
  //     responseType: 'arraybuffer',
  //   });
  // }

  // criarApostilamento(apostilamento: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
  //   return this.http.post<SolicitacaoDespesa>(`${this.baseURL}/apostilamento`, apostilamento);
  // }

  // duplicar(sd_id: number, solicitacaoDespesa: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
  //   return this.http.post<SolicitacaoDespesa>(`${this.baseURL}/duplicar/${sd_id}`, solicitacaoDespesa);
  // }

  deletar(id: number): Observable<PlanejamentoContratacao> {
    return this.http.delete<PlanejamentoContratacao>(`${this.baseURL}/${id}`);
  }

  // cancelar(sd_id: number, usuario_id: number): Observable<SolicitacaoDespesa> {
  //   return this.http.delete<SolicitacaoDespesa>(`${this.baseURL}/cancelar/${sd_id}/${usuario_id}`);
  // }

  // reativar(sd_id: number, usuario_id: number): Observable<SolicitacaoDespesa> {
  //   return this.http.get<SolicitacaoDespesa>(`${this.baseURL}/reativar/${sd_id}/${usuario_id}`);
  // }

  // criarDFD(dfd: SolicitacaoDespesaDFD): Observable<SolicitacaoDespesaDFD> {
  //   return this.http.post<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd`, dfd);
  // }

  // atualizarDFD(dfd: SolicitacaoDespesaDFD): Observable<SolicitacaoDespesaDFD> {
  //   return this.http.put<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd`, dfd);
  // }

  // consultarSolicitacaoDespesaDFD(sd_id: number): Observable<SolicitacaoDespesaDFD> {
  //   return this.http.get<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd/${sd_id}`);
  // }

  setPca(pcaData: PlanejamentoContratacaoData | null) {
    this.pcaData.next(pcaData);
  }

  setEtapasHeader(dataEtapasHeader: PcaDataEtapasHeader | null) {
    this.pcaDataEtapasHeader.next(dataEtapasHeader);
  }

  // listarTodosExercicio(): Observable<Exercicio[]> {
  //   return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  // }

  // listarStatusFluxo(): Observable<StatusFluxo[]> {
  //   return this.http.get<StatusFluxo[]>(`${environment.apiLegacyUrl}/shared/statusfluxo`);
  // }

  // listarTipoDemanda(): Observable<TipoDemanda[]> {
  //   return this.http.get<TipoDemanda[]>(`${environment.apiLegacyUrl}/shared/tipodemanda`);
  // }

  // listarSDMembrosPlanejamento(sd_id: number): Observable<{ sd_id: number; responsavel_membro_id: number }[]> {
  //   return this.http.get<{ sd_id: number; responsavel_membro_id: number }[]>(
  //     `${this.baseURL}/membrosplanejamento/${sd_id}`
  //   );
  // }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  // filtrar(parameters: any): Observable<SolicitacaoDespesa[]> {
  //   return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/filtrar`, {
  //     params: parameters,
  //   });
  // }
}
