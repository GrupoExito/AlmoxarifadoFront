import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CotacaoPostGreeSQL } from '../_models/cotacao-postgrees.model';
import { ClienteCotacao } from '../_models/cliente-cotacao.model';

@Injectable({
  providedIn: 'root',
})
export class CotacaoRealizadaService {
  baseURL = `${environment.apiLegacyUrl}/cotacaorealizada`;
  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/clientes`);
  }

  verificarItensCotacao(anexo: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/verificaritens`, anexo);
  }

  enviarCotacao(anexo: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}`, anexo);
  }

  listarCotacoesPorMunicipio(cliente: ClienteCotacao): Observable<CotacaoPostGreeSQL[]> {
    return this.http.post<CotacaoPostGreeSQL[]>(`${this.baseURL}/cotacoes`, cliente);
  }
}
