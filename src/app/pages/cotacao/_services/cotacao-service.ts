import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { COTACAOData, COTACAODataEtapasHeader } from '../_models/cotacao-data.model';
import { Cotacao } from '../_models/cotacao.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoService {
  private routeId: number | null = null;
  public cotacaoData = new BehaviorSubject<COTACAOData | null>(null);
  public cotacaoDataEtapasHeader = new BehaviorSubject<COTACAODataEtapasHeader | null>(null);
  data$ = this.cotacaoData.asObservable();
  cotacaoEtapasHeader$ = this.cotacaoDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/cotacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(this.baseURL);
  }

  consultarCotacaoQuantidade(id: number): Observable<COTACAODataEtapasHeader> {
    return this.http.get<COTACAODataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  consultarCotacao(id: number): Observable<Cotacao> {
    return this.http.get<Cotacao>(`${this.baseURL}/${id}`);
  }

  criar(cotacao: Cotacao): Observable<Cotacao> {
    return this.http.post<Cotacao>(`${this.baseURL}`, cotacao);
  }

  setCOTACAO(cotacaoData: COTACAOData | null) {
    this.cotacaoData.next(cotacaoData);
  }

  setEtapasHeader(dataEtapasHeader: COTACAODataEtapasHeader | null) {
    this.cotacaoDataEtapasHeader.next(dataEtapasHeader);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  editar(id: number, cotacao: Cotacao): Observable<Cotacao> {
    return this.http.put<Cotacao>(`${this.baseURL}/${id}`, cotacao);
  }

  deletar(id: number): Observable<Cotacao> {
    return this.http.delete<Cotacao>(`${this.baseURL}/${id}`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  listarCotacaoResponsaveis(cotacao_id: number): Observable<{ cotacao_id: number; responsavel_id: number }[]> {
    return this.http.get<{ cotacao_id: number; responsavel_id: number }[]>(
      `${this.baseURL}/responsaveis/${cotacao_id}`
    );
  }
}
