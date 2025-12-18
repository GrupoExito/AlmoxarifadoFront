import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { DocumentoComissao } from '../_models/documento-comissao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoComissaoService {
  baseURL = `${environment.apiLegacyUrl}/documentocomissao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<DocumentoComissao[]> {
    return this.http.get<DocumentoComissao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<DocumentoComissao> {
    return this.http.get<DocumentoComissao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, documentoComissao: DocumentoComissao): Observable<DocumentoComissao> {
    return this.http.put<DocumentoComissao>(`${this.baseURL}/${id}`, documentoComissao);
  }

  criar(documentoComissao: DocumentoComissao): Observable<DocumentoComissao> {
    return this.http.post<DocumentoComissao>(`${this.baseURL}`, documentoComissao);
  }

  deletar(id: number): Observable<DocumentoComissao> {
    return this.http.delete<DocumentoComissao>(`${this.baseURL}/${id}`);
  }
}
