import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaMaterialAnexo } from '../_models/entrada-material-anexo.model';


@Injectable({
  providedIn: 'root',
})
export class EntradaMaterialAnexoService {
  baseURL = `${environment.apiUrl}/entradamaterial`;
  constructor(private http: HttpClient) {}

  listarTodos(entrada_id: number): Observable<EntradaMaterialAnexo[]> {
    return this.http.get<EntradaMaterialAnexo[]>(`${this.baseURL}/anexo/${entrada_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<EntradaMaterialAnexo> {
    return this.http.post<EntradaMaterialAnexo>(`${this.baseURL}/anexo`, anexo);
  }

download(anexoId: number): Observable<ArrayBuffer> {
  return this.http.get(`${this.baseURL}/anexo/download/${anexoId}`, {
    responseType: 'arraybuffer',
  });}

  deletar(id: number): Observable<EntradaMaterialAnexo> {
    return this.http.delete<EntradaMaterialAnexo>(`${this.baseURL}/anexo/${id}`);
  }
}
