import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CotacaoItem } from '../_models/cotacao-item.model';
import { CotacaoLote } from '../_models/cotacao-lote.model';
import { CotacaoLoteItem } from '../_models/cotacao-lote-item.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoLoteService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/cotacaolote`;
  constructor(private http: HttpClient) {}

  criar(cotacaoLote: CotacaoLote): Observable<CotacaoLote> {
    return this.http.post<CotacaoLote>(`${this.baseURL}`, cotacaoLote);
  }

  listarCotacao(id: number): Observable<CotacaoLote[]> {
    return this.http.get<CotacaoLote[]>(`${this.baseURL}/${id}`);
  }

  listarItensLote(id: number): Observable<CotacaoItem[]> {
    return this.http.get<CotacaoItem[]>(`${this.baseURL}/lote/${id}`);
  }

  deletar(cotacao_lote_id: number): Observable<CotacaoLote> {
    return this.http.delete<CotacaoLote>(`${this.baseURL}/${cotacao_lote_id}`);
  }

  editarLote(cotacaoLote: { id: number; descricao_lote: string }): Observable<CotacaoLote> {
    return this.http.put<CotacaoLote>(`${this.baseURL}`, cotacaoLote);
  }

  importarItensDFD(cotacao_id: number): Observable<CotacaoLoteItem[]> {
    return this.http.get<CotacaoLoteItem[]>(`${this.baseURL}/importaritensdfd/${cotacao_id}`);
  }
}
