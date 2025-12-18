import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CotacaoItem } from '../_models/cotacao-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CotacaoItemService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/cotacaoitens`;
  constructor(private http: HttpClient) {}

  listarItensDaCotacao(cotacao_id: number): Observable<CotacaoItem[]> {
    return this.http.get<CotacaoItem[]>(`${this.baseURL}/${cotacao_id}`);
  }

  salvarSequencia(planejamentos: CotacaoItem[]): Observable<CotacaoItem[]> {
    return this.http.put<CotacaoItem[]>(`${this.baseURL}/sequencial`, planejamentos);
  }
}
