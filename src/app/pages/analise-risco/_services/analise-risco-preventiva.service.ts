import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoPreventiva } from '../_models/analise-risco-preventiva.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoPreventivaService {
  baseURL = `${environment.apiLegacyUrl}/analiseriscopreventiva`;
  constructor(private http: HttpClient) {}

  listarTodos(analise_risco_id: number, fase: number): Observable<AnaliseRiscoPreventiva[]> {
    return this.http.get<AnaliseRiscoPreventiva[]>(
      `${this.baseURL}/listarPorAnaliseRiscoId/${analise_risco_id}/${fase}`
    );
  }

  deletar(id: number): Observable<AnaliseRiscoPreventiva[]> {
    return this.http.delete<AnaliseRiscoPreventiva[]>(`${this.baseURL}/${id}`);
  }

  criar(analiseRiscoPreventiva: AnaliseRiscoPreventiva): Observable<AnaliseRiscoPreventiva> {
    return this.http.post<AnaliseRiscoPreventiva>(`${this.baseURL}`, analiseRiscoPreventiva);
  }

  editar(id: number, analiseRiscoPreventiva: AnaliseRiscoPreventiva): Observable<AnaliseRiscoPreventiva> {
    return this.http.put<AnaliseRiscoPreventiva>(`${this.baseURL}/${id}`, analiseRiscoPreventiva);
  }
}
