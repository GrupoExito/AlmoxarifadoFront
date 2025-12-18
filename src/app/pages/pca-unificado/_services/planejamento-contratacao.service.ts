import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PcaUnificado } from '../_models/planejamento-contratacao.model';
import { PcaDataEtapasHeader, PcaUnificadoData } from '../_models/planejamento-contratacao-data.model';
import { PcaUnificadoFfd, PcaUnificadoObjetosFFD } from '../_models/pca-unificado-ffd.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';

@Injectable({
  providedIn: 'root',
})
export class PcaUnificadoService {
  private routeId: number | null = null;
  public pcaData = new BehaviorSubject<PcaUnificadoData | null>(null);
  public pcaDataEtapasHeader = new BehaviorSubject<Partial<PcaDataEtapasHeader> | null>(null);
  data$ = this.pcaData.asObservable();
  dataEtapasHeader$ = this.pcaDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/pcaunificado`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PcaUnificado[]> {
    return this.http.get<PcaUnificado[]>(this.baseURL);
  }

  consultarPca(id: number): Observable<PcaUnificado> {
    return this.http.get<PcaUnificado>(`${this.baseURL}/${id}`);
  }

  consultarPcaQuantidade(id: number): Observable<PcaDataEtapasHeader> {
    return this.http.get<PcaDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(planejamentoContratacao: PcaUnificado): Observable<PcaUnificado> {
    return this.http.post<PcaUnificado>(`${this.baseURL}`, planejamentoContratacao);
  }

  editar(id: number, planejamentoContratacao: PcaUnificado): Observable<PcaUnificado> {
    return this.http.put<PcaUnificado>(`${this.baseURL}/${id}`, planejamentoContratacao);
  }

  setPca(pcaData: PcaUnificadoData | null) {
    this.pcaData.next(pcaData);
  }

  setEtapasHeader(dataEtapasHeader: PcaDataEtapasHeader | null) {
    this.pcaDataEtapasHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  listarPcaFfd(pca_unificado_id: number): Observable<PcaUnificadoFfd[]> {
    return this.http.get<PcaUnificadoFfd[]>(`${this.baseURL}/ffd/${pca_unificado_id}`);
  }

  adicionarPcaFfd(item: PcaUnificadoFfd): Observable<PcaUnificadoFfd> {
    return this.http.post<PcaUnificadoFfd>(`${this.baseURL}/ffd`, item);
  }

  deletarPcaFfd(id: number): Observable<PcaUnificadoFfd> {
    return this.http.delete<PcaUnificadoFfd>(`${this.baseURL}/ffd/${id}`);
  }

  listarPcaObjetos(pca_unificado_id: number): Observable<PcaUnificadoObjetosFFD[]> {
    return this.http.get<PcaUnificadoObjetosFFD[]>(`${this.baseURL}/objeto/${pca_unificado_id}`);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }
}
