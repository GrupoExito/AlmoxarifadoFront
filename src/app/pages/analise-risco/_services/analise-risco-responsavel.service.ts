import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoResponsavel } from '../_models/analise-risco-responsavel.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoResponsavelService {
  baseURL = `${environment.apiLegacyUrl}/analiseriscoresponsavel`;
  constructor(private http: HttpClient) {}

  listarTodos(analise_risco_id: number): Observable<AnaliseRiscoResponsavel[]> {
    return this.http.get<AnaliseRiscoResponsavel[]>(`${this.baseURL}/listarPorAnaliseRiscoId/${analise_risco_id}`);
  }

  deletar(id: number): Observable<AnaliseRiscoResponsavel[]> {
    return this.http.delete<AnaliseRiscoResponsavel[]>(`${this.baseURL}/${id}`);
  }

  criar(responsavel: AnaliseRiscoResponsavel): Observable<AnaliseRiscoResponsavel> {
    return this.http.post<AnaliseRiscoResponsavel>(`${this.baseURL}`, responsavel);
  }

  editar(id: number, analiseRiscoResponsavel: AnaliseRiscoResponsavel): Observable<AnaliseRiscoResponsavel> {
    return this.http.put<AnaliseRiscoResponsavel>(`${this.baseURL}/${id}`, analiseRiscoResponsavel);
  }
}
