import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exercicio } from '@pages/shared/models/exercicio.model';
import { TipoDemanda } from '@pages/shared/models/tipoDemanda.model';
import { AditivoData, AditivoDataEtapasHeader } from '../_models/aditivo-data.model';
import { Aditivo } from '../_models/aditivo.model';
import { AditivoHistorico } from '../_models/aditivo-historico.model';
import { Contrato } from '@pages/contrato/_models/contrato.model';

@Injectable({
  providedIn: 'root',
})
export class AditivoService {
  private routeId: number | null = null;
  public aditivoData = new BehaviorSubject<AditivoData | null>(null);
  public aditivoDataEtapasHeader = new BehaviorSubject<AditivoDataEtapasHeader | null>(null);
  data$ = this.aditivoData.asObservable();
  dataEtapasHeader$ = this.aditivoDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/aditivo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Aditivo[]> {
    return this.http.get<Aditivo[]>(this.baseURL);
  }

  consultarAditivo(id: number): Observable<Aditivo> {
    return this.http.get<Aditivo>(`${this.baseURL}/${id}`);
  }

  consultarAditivoQuantidade(id: number): Observable<AditivoDataEtapasHeader> {
    return this.http.get<AditivoDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  criar(aditivo: Partial<Aditivo>): Observable<Aditivo> {
    return this.http.post<Aditivo>(`${this.baseURL}`, aditivo);
  }

  deletar(id: number): Observable<Aditivo> {
    return this.http.delete<Aditivo>(`${this.baseURL}/${id}`);
  }

  cancelar(sd_id: number, usuario_id: number): Observable<Aditivo> {
    return this.http.delete<Aditivo>(`${this.baseURL}/cancelar/${sd_id}/${usuario_id}`);
  }

  reativar(sd_id: number, usuario_id: number): Observable<Aditivo> {
    return this.http.get<Aditivo>(`${this.baseURL}/reativar/${sd_id}/${usuario_id}`);
  }

  editar(id: number, aditivo: Partial<Aditivo>): Observable<Aditivo> {
    return this.http.put<Aditivo>(`${this.baseURL}/${id}`, aditivo);
  }

  setAditivo(aditivoData: AditivoData | null) {
    this.aditivoData.next(aditivoData);
  }

  setEtapasHeader(aditivoDataEtapasHeader: AditivoDataEtapasHeader | null) {
    this.aditivoDataEtapasHeader.next(aditivoDataEtapasHeader);
  }

  listarTodosExercicio(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(`${environment.apiLegacyUrl}/shared/exercicio`);
  }

  listarTipoDemanda(): Observable<TipoDemanda[]> {
    return this.http.get<TipoDemanda[]>(`${environment.apiLegacyUrl}/shared/tipodemanda`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any): Observable<Aditivo[]> {
    return this.http.get<Aditivo[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }

  listarTodosHistorico(aditivo_id: number): Observable<AditivoHistorico[]> {
    return this.http.get<AditivoHistorico[]>(`${this.baseURL}/historico/${aditivo_id}`);
  }

  salvarObservacao(obeservacao: AditivoHistorico): Observable<AditivoHistorico> {
    return this.http.post<AditivoHistorico>(`${this.baseURL}/historico/observacao`, obeservacao);
  }

  listarContratosComAditivo(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseURL}/contratos`);
  }

  sincronizarAditivoContratoPNCP(id: number, contrato_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/pncp/aditivo/${id}/${contrato_id}`);
  }
}
