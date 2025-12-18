import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipoDocumento';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  baseURL = `${environment.apiLegacyUrl}`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.baseURL}/shared/tipodocumento`);
  }
}
