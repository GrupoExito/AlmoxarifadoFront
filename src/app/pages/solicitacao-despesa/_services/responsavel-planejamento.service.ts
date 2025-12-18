import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsavelPlanejamento } from '../_models/responsavel-planejamento.model';
@Injectable({
  providedIn: 'root',
})
export class ResponsavelPlanejamentoService {
  baseURL = `${environment.apiLegacyUrl}/ResponsavelPlanejamento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ResponsavelPlanejamento[]> {
    return this.http.get<ResponsavelPlanejamento[]>(`${this.baseURL}`);
  }
}
