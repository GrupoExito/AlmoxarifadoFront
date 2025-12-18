import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PcaSimplificadoData, PcaSimplificadoDataEtapasHeader } from '../_models/pca-data.model';
import { PcaSimplificado } from '../_models/pca-simplificado.model';
import { Exercicio } from '@pages/shared/models/exercicio.model';
@Injectable({
  providedIn: 'root',
})
export class PcaSimplificadoService {
  private routeId: number | null = null;
  public pcaData = new BehaviorSubject<PcaSimplificadoData | null>(null);
  public PcaSimplificadoDataEtapasHeader = new BehaviorSubject<Partial<PcaSimplificadoDataEtapasHeader> | null>(null);
  data$ = this.pcaData.asObservable();
  dataEtapasHeader$ = this.PcaSimplificadoDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/pcasimplificado`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<PcaSimplificado[]> {
    return this.http.get<PcaSimplificado[]>(this.baseURL);
  }

  consultarPca(id: number): Observable<PcaSimplificado> {
    return this.http.get<PcaSimplificado>(`${this.baseURL}/${id}`);
  }

  criar(PcaSimplificado: PcaSimplificado): Observable<PcaSimplificado> {
    return this.http.post<PcaSimplificado>(`${this.baseURL}`, PcaSimplificado);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  // editar(id: number, planejamentoContratacao: PcaUnificado): Observable<PcaUnificado> {
  //   return this.http.put<PcaUnificado>(`${this.baseURL}/${id}`, planejamentoContratacao);
  // }

  setPca(pcaData: PcaSimplificadoData | null) {
    this.pcaData.next(pcaData);
  }

  setEtapasHeader(dataEtapasHeader: PcaSimplificadoDataEtapasHeader | null) {
    this.PcaSimplificadoDataEtapasHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }
}
