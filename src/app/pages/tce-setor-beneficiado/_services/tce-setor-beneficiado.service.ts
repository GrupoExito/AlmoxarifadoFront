import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TceSetorBeneficiado } from '../_models/tce-setor-beneficiado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TceSetorBeneficiadoService {
  baseURL = `${environment.apiLegacyUrl}/tcesetorbeneficiado`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TceSetorBeneficiado[]> {
    return this.http.get<TceSetorBeneficiado[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<TceSetorBeneficiado> {
    return this.http.get<TceSetorBeneficiado>(`${this.baseURL}/${id}`);
  }

  editar(id: number, TceSetorBeneficiado: TceSetorBeneficiado): Observable<TceSetorBeneficiado> {
    return this.http.put<TceSetorBeneficiado>(`${this.baseURL}/${id}`, TceSetorBeneficiado);
  }

  criar(TceSetorBeneficiado: TceSetorBeneficiado): Observable<TceSetorBeneficiado> {
    return this.http.post<TceSetorBeneficiado>(`${this.baseURL}`, TceSetorBeneficiado);
  }

  deletar(id: number): Observable<TceSetorBeneficiado> {
    return this.http.delete<TceSetorBeneficiado>(`${this.baseURL}/${id}`);
  }

  download(modelo: TceSetorBeneficiado, id: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/download/${id}`, modelo, {
      responseType: 'arraybuffer',
    });
  }
}
