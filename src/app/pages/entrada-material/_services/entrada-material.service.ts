import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntradaMaterial, ItemMovimentacao } from '../_models/entrada-material.model';
import { EMData, EMDataEtapasHeader } from '../_models/entrada-material-data.model';

@Injectable({
  providedIn: 'root',
})
export class EntradaMaterialService {
  private routeId: number | null = null;
  public eMData = new BehaviorSubject<EMData | null>(null);
  public emDataEtapasHeader = new BehaviorSubject<EMDataEtapasHeader | null>(null);
  data$ = this.eMData.asObservable();
  dataEtapasHeader$ = this.emDataEtapasHeader.asObservable();
  baseURL = `${environment.apiUrl}/entradamaterial`;
  EMData: any;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<EntradaMaterial[]> {
    return this.http.get<EntradaMaterial[]>(this.baseURL);
  }

  listarItemMovimentacao(): Observable<ItemMovimentacao[]> {
    return this.http.get<ItemMovimentacao[]>(`${this.baseURL}/ItensMovimentacao`);
  }

  consultarEntradaQuantidade(id: number): Observable<EMDataEtapasHeader> {
    console.log('Consultando quantidade itens:', id);
    return this.http.get<EMDataEtapasHeader>(`${this.baseURL}/quantidade/${id}`);
  }

  consultarPorId(id: number): Observable<EntradaMaterial> {
    console.log('Consultando entrada de material por ID:', id);
    return this.http.get<EntradaMaterial>(`${this.baseURL}/${id}`);
  }

  listarPorUsuario(usuario_id: number): Observable<EntradaMaterial[]> {
    return this.http.get<EntradaMaterial[]>(`${this.baseURL}/porusuario/${usuario_id}`);
  }

  editar(id: number, entradaMaterial: EntradaMaterial): Observable<EntradaMaterial> {
    return this.http.put<EntradaMaterial>(`${this.baseURL}/${id}`, entradaMaterial);
  }

  criar(entradaMaterial: EntradaMaterial): Observable<EntradaMaterial> {
    return this.http.post<EntradaMaterial>(`${this.baseURL}`, entradaMaterial);
  }

  deletar(id: number): Observable<EntradaMaterial> {
    return this.http.delete<EntradaMaterial>(`${this.baseURL}/${id}`);
  }

  alterarStatusEntradaMaterial(id: number, status_id: number): Observable<EntradaMaterial> {
    return this.http.put<EntradaMaterial>(`${this.baseURL}/status/${id}/${status_id}`,null);
  }

  setEntrada(eMData: EMData | null) {
    this.eMData.next(eMData);
  }

  setEtapasHeader(dataEtapasHeader: EMDataEtapasHeader | null) {
    this.emDataEtapasHeader.next(dataEtapasHeader);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  filtrar(parameters: any, usuario_id: number): Observable<EntradaMaterial[]> {
    return this.http.get<EntradaMaterial[]>(`${this.baseURL}/porusuario/${usuario_id}`, {
      params: parameters,
    });
  }
}
