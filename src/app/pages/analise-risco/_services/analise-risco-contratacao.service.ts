import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoContratacao } from '../_models/analise-risco-contratacao.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoContratacaoService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/analiserisco`;
  constructor(private http: HttpClient) {}

  editar(id: number, analiseRiscoContratacao: AnaliseRiscoContratacao, fase: number): Observable<AnaliseRiscoContratacao> {
    return this.http.put<AnaliseRiscoContratacao>(`${this.baseURL}/${id}/${fase}`, analiseRiscoContratacao);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  consultarAnaliseRiscoFase(id: number, fase: number): Observable<AnaliseRiscoContratacao> {
    return this.http.get<AnaliseRiscoContratacao>(`${this.baseURL}/${id}/${fase}`);
  }
}
