import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CotacaoProcessoAdm } from '../_models/cotacao-processo-administrativo';
import { ProcessoAdministrativo } from '@pages/processo-administrativo/_models/processo-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoProcessoAdmService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/CotacaoProcessoAdm`;
  constructor(private http: HttpClient) {}

  ConsultarPorCotacao(cotacao_id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/${cotacao_id}`);
  }

  listarSdPorCotacao(cotacao_id: number): Observable<CotacaoProcessoAdm[]> {
    return this.http.get<CotacaoProcessoAdm[]>(`${this.baseURL}/sdPor/${cotacao_id}`);
  }

  criar(cotacaoPA: CotacaoProcessoAdm): Observable<CotacaoProcessoAdm> {
    return this.http.post<CotacaoProcessoAdm>(`${this.baseURL}`, cotacaoPA);
  }

  deletar(cotacao_id: number): Observable<CotacaoProcessoAdm> {
    return this.http.delete<CotacaoProcessoAdm>(`${this.baseURL}/${cotacao_id}`);
  }

  listarProcessoAdm(processo_adm_id: number): Observable<ProcessoAdministrativo[]> {
    return this.http.get<ProcessoAdministrativo[]>(`${this.baseURL}/${processo_adm_id}`);
  }
}
