import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotacaoAutomatizada } from '../_models/cotacao-automatizada.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoAutomatizadaService {
  baseURL = `${environment.apiLegacyUrl}/cotacaoautomatizada`;
  constructor(private http: HttpClient) {}

  listarCotacoesAutomatizadas(): Observable<CotacaoAutomatizada[]> {
    return this.http.get<CotacaoAutomatizada[]>(`${this.baseURL}/64`);
  }

  marcarSelecionadosCotacoesAutomatizadas(itens: any): Observable<CotacaoAutomatizada[]> {
    return this.http.post<CotacaoAutomatizada[]>(`${this.baseURL}/teste4`, itens);
  }
}
