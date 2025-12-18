import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratoAnexo } from '../_models/contrato-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class ContratoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/contratoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(contrato_id: number): Observable<ContratoAnexo[]> {
    return this.http.get<ContratoAnexo[]>(`${this.baseURL}/${contrato_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<ContratoAnexo> {
    return this.http.post<ContratoAnexo>(`${this.baseURL}`, anexo);
  }

  download(sd_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${sd_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<ContratoAnexo> {
    return this.http.delete<ContratoAnexo>(`${this.baseURL}/${id}`);
  }
}
