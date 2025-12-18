import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PcaUnificadoAnexo } from '../_models/pca-unificado-anexo.model';


@Injectable({
  providedIn: 'root',
})
export class PcaUnificadoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/pcaunificadoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_unificado_id: number): Observable<PcaUnificadoAnexo[]> {
    return this.http.get<PcaUnificadoAnexo[]>(`${this.baseURL}/${pca_unificado_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<PcaUnificadoAnexo> {
    return this.http.post<PcaUnificadoAnexo>(`${this.baseURL}`, anexo);
  }

  download(pca_unificado_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${pca_unificado_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<PcaUnificadoAnexo> {
    return this.http.delete<PcaUnificadoAnexo>(`${this.baseURL}/${id}`);
  }
}
