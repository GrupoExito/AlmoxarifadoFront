import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoDespesaFFD } from '../_models/solicitacao-despesa-ffd.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoDespesaFFDService {
  baseURL = `${environment.apiLegacyUrl}/solicitacaodespesaffd`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<SolicitacaoDespesaFFD[]> {
    return this.http.get<SolicitacaoDespesaFFD[]>(`${this.baseURL}/${sd_id}`);
  }

  criar(sdFfd: SolicitacaoDespesaFFD): Observable<SolicitacaoDespesaFFD> {
    return this.http.post<SolicitacaoDespesaFFD>(`${this.baseURL}`, sdFfd);
  }

  deletar(id: number): Observable<SolicitacaoDespesaFFD> {
    return this.http.delete<SolicitacaoDespesaFFD>(`${this.baseURL}/${id}`);
  }
}
