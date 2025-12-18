import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PcaObjeto, PcaSimplificadoObjeto } from '../_models/pca-simplificado.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PcaSimplificadoObjetoService {
  baseURL = `${environment.apiLegacyUrl}/pcasimplificadoobjeto`;
  constructor(private http: HttpClient) {}

  listarTodosObjetos(): Observable<PcaObjeto[]> {
    return this.http.get<PcaObjeto[]>(this.baseURL);
  }

  adicionarPcaObjeto(item: PcaSimplificadoObjeto): Observable<PcaSimplificadoObjeto> {
    return this.http.post<PcaSimplificadoObjeto>(`${this.baseURL}`, item);
  }

  listarPcaObjeto(pca_simplificado_id: number): Observable<PcaSimplificadoObjeto[]> {
    return this.http.get<PcaSimplificadoObjeto[]>(`${this.baseURL}/listar/${pca_simplificado_id}`);
  }

  deletarPcaObjeto(id: number): Observable<PcaSimplificadoObjeto> {
    return this.http.delete<PcaSimplificadoObjeto>(`${this.baseURL}/${id}`);
  }
}
