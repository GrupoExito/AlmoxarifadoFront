import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ModeloDocumento } from '../_models/modelo-documento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloDocumentoService {
  baseURL = `${environment.apiLegacyUrl}/modelodocumento`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ModeloDocumento[]> {
    return this.http.get<ModeloDocumento[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ModeloDocumento> {
    return this.http.get<ModeloDocumento>(`${this.baseURL}/${id}`);
  }

  consultarPorTermoReferencia(termo_referencia_id: number): Observable<ModeloDocumento> {
    return this.http.get<ModeloDocumento>(`${this.baseURL}/termoreferencia/${termo_referencia_id}`);
  }

  editar(id: number, ModeloDocumento: ModeloDocumento): Observable<ModeloDocumento> {
    return this.http.put<ModeloDocumento>(`${this.baseURL}/${id}`, ModeloDocumento);
  }

  criar(ModeloDocumento: ModeloDocumento): Observable<ModeloDocumento> {
    return this.http.post<ModeloDocumento>(`${this.baseURL}`, ModeloDocumento);
  }

  deletar(id: number): Observable<ModeloDocumento> {
    return this.http.delete<ModeloDocumento>(`${this.baseURL}/${id}`);
  }

  download(modelo: ModeloDocumento, id: number): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/download/${id}`, modelo, {
      responseType: 'arraybuffer',
    });
  }
}
