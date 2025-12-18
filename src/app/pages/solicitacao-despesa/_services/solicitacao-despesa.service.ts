import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FiltrarDFD,
  SolicitacaoDespesa,
  SolicitacaoDespesaSaldoApostilamento,
} from '../_models/solicitacao-despesa.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { SDData, SDDataEtapasHeader } from '../_models/solicitacao-despesa-data.model';
import { SolicitacaoDespesaDFD } from '../_models/dfd.model';
import { StatusFluxo } from '@pages/shared/models/fluxo.model';
import { TipoObjeto } from '../_models/tipo-objeto.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaService {
  private routeId: number | null = null;
  public sdData = new BehaviorSubject<SDData | null>(null);
  public sdDataEtapasHeader = new BehaviorSubject<Partial<SDDataEtapasHeader> | null>(null);
  data$ = this.sdData.asObservable();
  dataEtapasHeader$ = this.sdDataEtapasHeader.asObservable();
  private filtros: FiltrarDFD = new FiltrarDFD();

  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesa`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SolicitacaoDespesa[]> {
    return this.http.get<SolicitacaoDespesa[]>(this.baseURL);
  }

  listarTodosParaApostilamento(): Observable<SolicitacaoDespesa[]> {
    return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/apostilamento`);
  }

  consultarSolicitacaoDespesa(id: number): Observable<SolicitacaoDespesa> {
    return this.http.get<SolicitacaoDespesa>(`${this.baseURL}/${id}`);
  }

  consultarSDQuantidade(id: number): Observable<SDDataEtapasHeader> {
    return this.http.get<SDDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(solicitacaoDespesa: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
    return this.http.post<SolicitacaoDespesa>(`${this.baseURL}`, solicitacaoDespesa);
  }

  criarApostilamento(apostilamento: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
    return this.http.post<SolicitacaoDespesa>(`${this.baseURL}/apostilamento`, apostilamento);
  }

  duplicar(sd_id: number, solicitacaoDespesa: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
    return this.http.post<SolicitacaoDespesa>(`${this.baseURL}/duplicar/${sd_id}`, solicitacaoDespesa);
  }

  deletar(id: number): Observable<SolicitacaoDespesa> {
    return this.http.delete<SolicitacaoDespesa>(`${this.baseURL}/${id}`);
  }

  cancelar(sd_id: number, usuario_id: number): Observable<SolicitacaoDespesa> {
    return this.http.delete<SolicitacaoDespesa>(`${this.baseURL}/cancelar/${sd_id}/${usuario_id}`);
  }

  reativar(sd_id: number, usuario_id: number): Observable<SolicitacaoDespesa> {
    return this.http.get<SolicitacaoDespesa>(`${this.baseURL}/reativar/${sd_id}/${usuario_id}`);
  }

  editar(id: number, solicitacaoDespesa: SolicitacaoDespesa): Observable<SolicitacaoDespesa> {
    return this.http.put<SolicitacaoDespesa>(`${this.baseURL}/${id}`, solicitacaoDespesa);
  }

  criarDFD(dfd: SolicitacaoDespesaDFD): Observable<SolicitacaoDespesaDFD> {
    return this.http.post<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd`, dfd);
  }

  atualizarDFD(dfd: SolicitacaoDespesaDFD): Observable<SolicitacaoDespesaDFD> {
    return this.http.put<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd`, dfd);
  }

  consultarSolicitacaoDespesaDFD(sd_id: number): Observable<SolicitacaoDespesaDFD> {
    return this.http.get<SolicitacaoDespesaDFD>(`${this.baseURL}/dfd/${sd_id}`);
  }

  setSD(sdData: SDData | null) {
    this.sdData.next(sdData);
  }

  setEtapasHeader(dataEtapasHeader: SDDataEtapasHeader | null) {
    this.sdDataEtapasHeader.next(dataEtapasHeader);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  listarStatusFluxo(): Observable<StatusFluxo[]> {
    return this.http.get<StatusFluxo[]>(`${environment.apiLegacyUrl}/shared/statusfluxo`);
  }

  listarTipoDemanda(): Observable<TipoDemanda[]> {
    return this.http.get<TipoDemanda[]>(`${environment.apiLegacyUrl}/shared/tipodemanda`);
  }

  listarTiposObjeto(): Observable<TipoObjeto[]> {
    return this.http.get<TipoObjeto[]>(`${this.baseURL}/tiposobjeto`);
  }

  listarSDTiposObjeto(sd_id: number): Observable<{ sd_id: number; tipo_objeto_id: number }[]> {
    return this.http.get<{ sd_id: number; tipo_objeto_id: number }[]>(`${this.baseURL}/tiposobjeto/${sd_id}`);
  }

  listarSDMembrosPlanejamento(sd_id: number): Observable<{ sd_id: number; responsavel_membro_id: number }[]> {
    return this.http.get<{ sd_id: number; responsavel_membro_id: number }[]>(
      `${this.baseURL}/membrosplanejamento/${sd_id}`
    );
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  consultarSolicitacaoDespesaPorSecretaria(id: number): Observable<SolicitacaoDespesa[]> {
    return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/secretaria/${id}`);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<SolicitacaoDespesa[]> {
    return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  consultarSDPorCotacao(sd_id: number): Observable<SolicitacaoDespesa> {
    return this.http.get<SolicitacaoDespesa>(`${this.baseURL}/cotacaoSD/${sd_id}`);
  }

  consultarSolicitacaoDespesaPorSecretariaSemPA(id: number): Observable<SolicitacaoDespesa[]> {
    return this.http.get<SolicitacaoDespesa[]>(`${this.baseURL}/secretariaSemPa/${id}`);
  }

  setFiltros(filtros: FiltrarDFD): void {
    this.filtros = { ...this.filtros, ...filtros };
  }

  getFiltros(): FiltrarDFD {
    return this.filtros;
  }

  clearFiltros(): void {
    this.filtros = new FiltrarDFD();
  }

  consultarSolicitacaoDespesaSaldoItem(id: number): Observable<SolicitacaoDespesaSaldoApostilamento[]> {
    return this.http.get<SolicitacaoDespesaSaldoApostilamento[]>(`${this.baseURL}/saldo/itens/${id}`);
  }
}
