import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AditivoItem, AditivoItemEditar } from '../_models/aditivo-item.model';
import { AditivoItemAdicionarTodos } from '../_models/aditivo.model';

@Injectable({
  providedIn: 'root',
})
export class AditivoItemService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/aditivoitem`;
  constructor(private http: HttpClient) {}

  listarAditivoItem(aditivo_id: number): Observable<AditivoItem[]> {
    return this.http.get<AditivoItem[]>(`${this.baseURL}/${aditivo_id}`);
  }

  listarAditivoContratoItem(aditivo_id: number, contrato_id: number): Observable<AditivoItem[]> {
    return this.http.get<AditivoItem[]>(`${this.baseURL}/${aditivo_id}/${contrato_id}`);
  }

  consultarAditivo(id: number): Observable<AditivoItem> {
    return this.http.get<AditivoItem>(`${this.baseURL}/consultar/${id}`);
  }

  adicionarItem(aditivoItem: AditivoItem): Observable<AditivoItem> {
    return this.http.post<AditivoItem>(`${this.baseURL}`, aditivoItem);
  }

  adicionarTodosItem(adicionarTodosItens: AditivoItemAdicionarTodos): Observable<AditivoItemAdicionarTodos> {
    return this.http.post<AditivoItemAdicionarTodos>(`${this.baseURL}/todositens`, adicionarTodosItens);
  }

  deletarItem(id: number): Observable<AditivoItem> {
    return this.http.delete<AditivoItem>(`${this.baseURL}/${id}`);
  }

  atualizarQuantidadeitem(aditivoItemEditar: AditivoItemEditar): Observable<AditivoItemEditar[]> {
    return this.http.put<AditivoItemEditar[]>(`${this.baseURL}/quantidade`, aditivoItemEditar);
  }
}
