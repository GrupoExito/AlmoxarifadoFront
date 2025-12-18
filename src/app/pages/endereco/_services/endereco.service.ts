import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../_models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  baseURL = `${environment.apiLegacyUrl}/endereco`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.baseURL);
  }
  
  criar(bairro: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.baseURL}`, bairro);
  }
  consultarPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseURL}/${id}`);
  }

  consultarEnderecoPorCEP(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseURL}/cep/${cep}`);
  }

  editar(id: number, bairro: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.baseURL}/${id}`, bairro);
  }

  deletar(id: number): Observable<Endereco> {
    return this.http.delete<Endereco>(`${this.baseURL}/${id}`);
  }

  listarPorMunicipio(id: number): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.baseURL}/municipios/${id}`);
  }
}
