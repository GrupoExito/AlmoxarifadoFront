import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../_models/pessoa.model';
import { Usuario } from '../_models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private routeId: number | null = null;
  baseURL = `${environment.apiLegacyUrl}/pessoa`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.baseURL);
  }

  listarTodosFiscalContrato(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}/fiscalcontrato`);
  }

  consultarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseURL}/${id}`);
  }

  editar(id: number, pessoa: FormData): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseURL}/${id}`, pessoa);
  }

  criar(pessoa: FormData): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseURL}`, pessoa);
  }

  deletar(id: number): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.baseURL}/${id}`);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios`);
  }

  listarPorSecretaria(id_secretaria: number): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseURL}/secretaria/${id_secretaria}`);
  }

  salvarAnexo(pessoa: FormData): Observable<Pessoa[]> {
    return this.http.post<Pessoa[]>(`${this.baseURL}/assinatura`, pessoa);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  download(id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${id}`, {
      responseType: 'arraybuffer',
    });
  }
}
