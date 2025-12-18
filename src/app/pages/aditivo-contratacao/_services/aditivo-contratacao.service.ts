import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { AditivoContratacaoData, AditivoContratacaoDataEtapasHeader } from '../_models/aditivo-contratacao-data.model';
import { AditivoContratacao } from '../_models/aditivo-contratacao.model';
import { AditivoHistorico } from '../_models/aditivo-contratacao-historico.model';

@Injectable({
  providedIn: 'root',
})
export class AditivoContratacaoService {
  private routeId: number | null = null;
  public aditivoContratacaoData = new BehaviorSubject<AditivoContratacaoData | null>(null);
  public aditivoContratacaoDataEtapasHeader = new BehaviorSubject<AditivoContratacaoDataEtapasHeader | null>(null);
  data$ = this.aditivoContratacaoData.asObservable();
  dataEtapasHeader$ = this.aditivoContratacaoDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/aditivocontratacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<AditivoContratacao[]> {
    return this.http.get<AditivoContratacao[]>(this.baseURL);
  }

  consultarAditivoContratacao(id: number): Observable<AditivoContratacao> {
    return this.http.get<AditivoContratacao>(`${this.baseURL}/${id}`);
  }

  consultarAditivoContratacaoQuantidade(id: number): Observable<AditivoContratacaoDataEtapasHeader> {
    return this.http.get<AditivoContratacaoDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(aditivoContratacao: Partial<AditivoContratacao>): Observable<AditivoContratacao> {
    return this.http.post<AditivoContratacao>(`${this.baseURL}`, aditivoContratacao);
  }

  editar(id: number, aditivoContratacao: Partial<AditivoContratacao>): Observable<AditivoContratacao> {
    return this.http.put<AditivoContratacao>(`${this.baseURL}/${id}`, aditivoContratacao);
  }

  setAditivoContratacao(aditivoContratacaoData: AditivoContratacaoData | null) {
    this.aditivoContratacaoData.next(aditivoContratacaoData);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<AditivoContratacao[]> {
    return this.http.get<AditivoContratacao[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  listarTodosHistorico(aditivo_id: number): Observable<AditivoHistorico[]> {
    return this.http.get<AditivoHistorico[]>(`${this.baseURL}/historico/${aditivo_id}`);
  }

  salvarObservacao(obeservacao: AditivoHistorico): Observable<AditivoHistorico> {
    return this.http.post<AditivoHistorico>(`${this.baseURL}/historico/observacao`, obeservacao);
  }

  setEtapasHeader(dataEtapasHeader: AditivoContratacaoDataEtapasHeader | null) {
    this.aditivoContratacaoDataEtapasHeader.next(dataEtapasHeader);
  }
}
