import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotacaoAnexo } from '../_models/cotacao-anexo.model';
@Injectable({
  providedIn: 'root',
})
export class CotacaoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/cotacaoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(cotacao_id: number): Observable<CotacaoAnexo[]> {
    return this.http.get<CotacaoAnexo[]>(`${this.baseURL}/${cotacao_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<CotacaoAnexo> {
    return this.http.post<CotacaoAnexo>(`${this.baseURL}`, anexo);
  }

  download(cotacao_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${cotacao_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<CotacaoAnexo> {
    return this.http.delete<CotacaoAnexo>(`${this.baseURL}/${id}`);
  }
}
