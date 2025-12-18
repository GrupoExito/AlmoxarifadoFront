import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaGestao } from '../_models/pessoa.model';


@Injectable({
  providedIn: 'root',
})
export class PessoaGestaoService {
  baseURL = `${environment.apiLegacyUrl}/pessoagestao`;
  private routeId: number | null = null;
  constructor(private http: HttpClient) {}

  listarGestaoPorPessoa(gpessoa_id: number): Observable<PessoaGestao[]> {
    return this.http.get<PessoaGestao[]>(`${this.baseURL}/listarPorPessoaId/${gpessoa_id}`);
  }
 
  consultarPorId(id: number): Observable<PessoaGestao> {
    return this.http.get<PessoaGestao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, pessoagestao: PessoaGestao): Observable<PessoaGestao> {
    return this.http.put<PessoaGestao>(`${this.baseURL}/${id}`, pessoagestao);
  }

  criar(pessoagestao: PessoaGestao): Observable<PessoaGestao> {
    return this.http.post<PessoaGestao>(`${this.baseURL}`, pessoagestao);
  }

  deletar(id: number): Observable<PessoaGestao> {
    return this.http.delete<PessoaGestao>(`${this.baseURL}/${id}`);
  }

  
  getRouteId(): number | null {
    return this.routeId;
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  download(id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${id}`, {
      responseType: 'arraybuffer',
    });
  }
}
