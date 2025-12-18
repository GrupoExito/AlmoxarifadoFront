import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoDano } from '../_models/analise-risco-dano.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoDanoService {
  baseURL = `${environment.apiLegacyUrl}/analiseriscodano`;
  constructor(private http: HttpClient) {}

  listarTodos(analise_risco_id: number, fase: number): Observable<AnaliseRiscoDano[]> {
    return this.http.get<AnaliseRiscoDano[]>(`${this.baseURL}/listarPorAnaliseRiscoId/${analise_risco_id}/${fase}`);
  }

  listarTodosPorRisco(analise_risco_risco_id: number, fase: number): Observable<AnaliseRiscoDano[]> {
    return this.http.get<AnaliseRiscoDano[]>(`${this.baseURL}/listarRiscoId/${analise_risco_risco_id}/${fase}`);
  }

  deletar(id: number): Observable<AnaliseRiscoDano[]> {
    return this.http.delete<AnaliseRiscoDano[]>(`${this.baseURL}/${id}`);
  }

  criar(analiseRiscoDano: AnaliseRiscoDano): Observable<AnaliseRiscoDano> {
    console.log(analiseRiscoDano);
    return this.http.post<AnaliseRiscoDano>(`${this.baseURL}`, analiseRiscoDano);
  }

  editar(id: number, analiseRiscoDano: AnaliseRiscoDano): Observable<AnaliseRiscoDano> {
    return this.http.put<AnaliseRiscoDano>(`${this.baseURL}/${id}`, analiseRiscoDano);
  }
}
