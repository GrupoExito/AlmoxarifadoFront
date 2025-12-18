import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContratacaoAnexo } from '../_models/contratacao-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class ContratacaoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/contratacaoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(contratacao_id: number): Observable<ContratacaoAnexo[]> {
    return this.http.get<ContratacaoAnexo[]>(`${this.baseURL}/${contratacao_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<ContratacaoAnexo> {
    return this.http.post<ContratacaoAnexo>(`${this.baseURL}`, anexo);
  }

  download(sd_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${sd_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<ContratacaoAnexo> {
    return this.http.delete<ContratacaoAnexo>(`${this.baseURL}/${id}`);
  }
}
