import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemMovimentacao, SaidaMaterial, SaidaMaterialTransferencia } from '../_models/saida-material.model';
import { SMData, SMDataEtapasHeader } from '../_models/saida-material-data.model';

@Injectable({
  providedIn: 'root',
})
export class SaidaMaterialService {
  private routeId: number | null = null;
  public sMData = new BehaviorSubject<SMData | null>(null);
  public smDataEtapasHeader = new BehaviorSubject<SMDataEtapasHeader | null>(null);
  data$ = this.sMData.asObservable();
  dataEtapasHeader$ = this.smDataEtapasHeader.asObservable();
  baseURL = `${environment.apiUrl}/saidamaterial`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(this.baseURL);
  }

  listarItemMovimentacao(): Observable<ItemMovimentacao[]> {
    return this.http.get<ItemMovimentacao[]>(`${this.baseURL}/ItensMovimentacao`);
  }

  consultarSaidaQuantidade(id: number): Observable<SMDataEtapasHeader> {
    return this.http.get<SMDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  duplicarSaida(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/duplicarsaida/${id}`);
  }

  alterarStatusSaidaMaterial(SaidaMaterialTransferencia: SaidaMaterialTransferencia): Observable<SaidaMaterial> {
    return this.http.put<SaidaMaterial>(`${this.baseURL}/status`, SaidaMaterialTransferencia);
  }

  consultarPorId(id: number): Observable<SaidaMaterial> {
    return this.http.get<SaidaMaterial>(`${this.baseURL}/${id}`);
  }

  editar(id: number, saidaMaterial: SaidaMaterial): Observable<SaidaMaterial> {
    return this.http.put<SaidaMaterial>(`${this.baseURL}/${id}`, saidaMaterial);
  }

  criar(saidaMaterial: SaidaMaterial): Observable<SaidaMaterial> {
    return this.http.post<SaidaMaterial>(`${this.baseURL}`, saidaMaterial);
  }

  deletar(id: number): Observable<SaidaMaterial> {
    return this.http.delete<SaidaMaterial>(`${this.baseURL}/${id}`);
  }

  enviarSolicitacao(id: number): Observable<SaidaMaterial> {
    return this.http.put<SaidaMaterial>(`${this.baseURL}/enviarSolicitacao/${id}`,null);
  }

  setSaida(eMData: SMData | null) {
    this.sMData.next(eMData);
  }

  setEtapasHeader(dataEtapasHeader: SMDataEtapasHeader | null) {
    this.smDataEtapasHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any, usuario_id: number): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(`${this.baseURL}/porusuario/${usuario_id}`, {
      params: parameters,
    });
  }

  filtrarSaidasCidadao(parameters: any): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(`${this.baseURL}/filtrarSaidaporcidadao`, {
      params: parameters,
    });
  }

  listarSaidasComCidadao(): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(`${this.baseURL}/porcidadao`);
  }

  listarPorUsuario(usuario_id: number): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(`${this.baseURL}/porusuario/${usuario_id}`);
  }

    listarPorUsuarioAutorizador(usuario_id: number): Observable<SaidaMaterial[]> {
    return this.http.get<SaidaMaterial[]>(`${this.baseURL}/autorizador/${usuario_id}`);
  }
}
