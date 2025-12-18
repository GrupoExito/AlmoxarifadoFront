import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaidaMaterialAnexo } from '../_models/saida-material-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class SaidaMaterialAnexoService {
  baseURL = `${environment.apiUrl}/saidamaterialanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(saida_id: number): Observable<SaidaMaterialAnexo[]> {
    return this.http.get<SaidaMaterialAnexo[]>(`${this.baseURL}/${saida_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<SaidaMaterialAnexo> {
    return this.http.post<SaidaMaterialAnexo>(`${this.baseURL}`, anexo);
  }

  download(saida_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${saida_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<SaidaMaterialAnexo> {
    return this.http.delete<SaidaMaterialAnexo>(`${this.baseURL}/${id}`);
  }
}
