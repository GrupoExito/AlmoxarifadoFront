import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CotacaoLoteItem } from '../_models/cotacao-lote-item.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoLoteItemService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/cotacaoloteitem`;
  constructor(private http: HttpClient) {}

  listarItensLote(id: number): Observable<CotacaoLoteItem[]> {
    return this.http.get<CotacaoLoteItem[]>(`${this.baseURL}/${id}`);
  }

  adicionarItensLote(cotacaoLoteItem: CotacaoLoteItem[]): Observable<CotacaoLoteItem> {
    return this.http.post<CotacaoLoteItem>(`${this.baseURL}`, cotacaoLoteItem);
  }

  consultarItensPorLote(id: number): Observable<CotacaoLoteItem[]> {
    return this.http.get<CotacaoLoteItem[]>(`${this.baseURL}/lote/${id}`);
  }

  removerItensLote(id: any[]): Observable<CotacaoLoteItem> {
    return this.http.post<CotacaoLoteItem>(`${this.baseURL}/deletar`, id);
  }
}
