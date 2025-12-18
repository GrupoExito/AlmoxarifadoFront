import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TermoReferenciaAnexo } from '../_models/termo-referencia-anexo.model';
@Injectable({
  providedIn: 'root',
})
export class TermoReferenciaAnexoService {
  baseURL = `${environment.apiLegacyUrl}/termoreferenciaanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(tr_id: number): Observable<TermoReferenciaAnexo[]> {
    return this.http.get<TermoReferenciaAnexo[]>(`${this.baseURL}/${tr_id}`);
  }

  salvarAnexo(planejamento: FormData): Observable<TermoReferenciaAnexo> {
    return this.http.post<TermoReferenciaAnexo>(`${this.baseURL}`, planejamento);
  }

  download(pa_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${pa_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<TermoReferenciaAnexo> {
    return this.http.delete<TermoReferenciaAnexo>(`${this.baseURL}/${id}`);
  }
}
