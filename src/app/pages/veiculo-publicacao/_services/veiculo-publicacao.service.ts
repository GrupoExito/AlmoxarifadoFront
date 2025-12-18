import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { VeiculoPublicacao } from '../_models/veiculo-publicacao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeiculoPublicacaoService {
  baseURL = `${environment.apiLegacyUrl}/veiculopublicacao`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<VeiculoPublicacao[]> {
    return this.http.get<VeiculoPublicacao[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<VeiculoPublicacao> {
    return this.http.get<VeiculoPublicacao>(`${this.baseURL}/${id}`);
  }

  editar(id: number, VeiculoPublicacao: VeiculoPublicacao): Observable<VeiculoPublicacao> {
    return this.http.put<VeiculoPublicacao>(`${this.baseURL}/${id}`, VeiculoPublicacao);
  }

  criar(VeiculoPublicacao: VeiculoPublicacao): Observable<VeiculoPublicacao> {
    return this.http.post<VeiculoPublicacao>(`${this.baseURL}`, VeiculoPublicacao);
  }

  deletar(id: number): Observable<VeiculoPublicacao> {
    return this.http.delete<VeiculoPublicacao>(`${this.baseURL}/${id}`);
  }
}
