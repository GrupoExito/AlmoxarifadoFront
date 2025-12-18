import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoContingencia } from '../_models/analise-risco-contingencia.model';
import { ARData, ARDataEtapasHeader } from '../_models/analise-risco-data.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoContingenciaService {
  baseURL = `${environment.apiLegacyUrl}/analiseriscocontingencia`;
  constructor(private http: HttpClient) {}

  listarTodos(analise_risco_id: number, fase: number): Observable<AnaliseRiscoContingencia[]> {
    return this.http.get<AnaliseRiscoContingencia[]>(`${this.baseURL}/listarPorAnaliseRiscoId/${analise_risco_id}/${fase}`);
  }

  deletar(id: number): Observable<AnaliseRiscoContingencia[]> {
    return this.http.delete<AnaliseRiscoContingencia[]>(`${this.baseURL}/${id}`);
  }

  criar(analiseRiscoContingencia: AnaliseRiscoContingencia): Observable<AnaliseRiscoContingencia> {
    console.log(analiseRiscoContingencia);
    return this.http.post<AnaliseRiscoContingencia>(`${this.baseURL}`, analiseRiscoContingencia);
  }

  editar(id: number, analiseRiscoContingencia: AnaliseRiscoContingencia): Observable<AnaliseRiscoContingencia> {
    return this.http.put<AnaliseRiscoContingencia>(`${this.baseURL}/${id}`, analiseRiscoContingencia);
  }
}
