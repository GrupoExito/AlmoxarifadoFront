import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoAdministrativoAnexo } from '../_models/processo-administrativo-anexo.model';
@Injectable({
  providedIn: 'root',
})
export class ProcessoAdministrativoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/processoadministrativoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(sd_id: number): Observable<ProcessoAdministrativoAnexo[]> {
    return this.http.get<ProcessoAdministrativoAnexo[]>(`${this.baseURL}/${sd_id}`);
  }

  salvarAnexo(planejamento: FormData): Observable<ProcessoAdministrativoAnexo> {
    return this.http.post<ProcessoAdministrativoAnexo>(`${this.baseURL}`, planejamento);
  }

  download(pa_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${pa_id}`, {
      responseType: 'arraybuffer',
    });
  }
   impressoAnexo(pa_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/imprimirtodos/${pa_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<ProcessoAdministrativoAnexo> {
    return this.http.delete<ProcessoAdministrativoAnexo>(`${this.baseURL}/${id}`);
  }

  salvarSequencia(planejamentos: ProcessoAdministrativoAnexo[]): Observable<ProcessoAdministrativoAnexo[]> {
    return this.http.put<ProcessoAdministrativoAnexo[]>(`${this.baseURL}/sequencial`, planejamentos);
  }
}
