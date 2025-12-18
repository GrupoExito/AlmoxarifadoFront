import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoPlanejamento } from '../_models/analise-risco-planejamento.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoPlanejamentoService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/analiserisco`;
  constructor(private http: HttpClient) {}

  editar(id: number, analiseRiscoPlanejamento: AnaliseRiscoPlanejamento, fase: number): Observable<AnaliseRiscoPlanejamento> {
    return this.http.put<AnaliseRiscoPlanejamento>(`${this.baseURL}/${id}/${fase}`, analiseRiscoPlanejamento);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  consultarAnaliseRiscoFase(id: number, fase: number): Observable<AnaliseRiscoPlanejamento> {
    return this.http.get<AnaliseRiscoPlanejamento>(`${this.baseURL}/${id}/${fase}`);
  }
}
