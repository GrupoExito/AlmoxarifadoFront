import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoEtp } from '../_models/analise-risco-etp.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoEtpService {
  baseURL = `${environment.apiLegacyUrl}/analiseriscoetp`;
  constructor(private http: HttpClient) {}

  listarTodos(analise_risco_id: number): Observable<AnaliseRiscoEtp[]> {
    return this.http.get<AnaliseRiscoEtp[]>(`${this.baseURL}/${analise_risco_id}`);
  }

  deletar(id: number): Observable<AnaliseRiscoEtp[]> {
    return this.http.delete<AnaliseRiscoEtp[]>(`${this.baseURL}/${id}`);
  }

  criar(planejamento: AnaliseRiscoEtp): Observable<AnaliseRiscoEtp> {
    return this.http.post<AnaliseRiscoEtp>(`${this.baseURL}`, planejamento);
  }
}
