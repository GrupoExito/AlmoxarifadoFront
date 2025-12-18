import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseRiscoFornecedor } from '../_models/analise-risco-fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class AnaliseRiscoFornecedorService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/analiserisco`;
  constructor(private http: HttpClient) {}

  editar(id: number, analiseRiscoFornecedor: AnaliseRiscoFornecedor, fase: number): Observable<AnaliseRiscoFornecedor> {
    return this.http.put<AnaliseRiscoFornecedor>(`${this.baseURL}/${id}/${fase}`, analiseRiscoFornecedor);
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  consultarAnaliseRiscoFase(id: number, fase: number): Observable<AnaliseRiscoFornecedor> {
    return this.http.get<AnaliseRiscoFornecedor>(`${this.baseURL}/${id}/${fase}`);
  }
}
