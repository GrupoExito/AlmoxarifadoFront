import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DotacaoOrcamentaria } from '../_models/dotacao-orcamentaria.model';

@Injectable({
  providedIn: 'root',
})
export class DotacaoOrcamentariaService {
  baseURL = `${environment.apiLegacyUrl}/dotacaoorcamentaria`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<DotacaoOrcamentaria> {
    return this.http.get<DotacaoOrcamentaria>(`${this.baseURL}/${id}`);
  }

  editar(id: number, dotacaoorcarmentaria: DotacaoOrcamentaria): Observable<DotacaoOrcamentaria> {
    return this.http.put<DotacaoOrcamentaria>(`${this.baseURL}/${id}`, dotacaoorcarmentaria);
  }

  criar(dotacaoorcarmentaria: DotacaoOrcamentaria): Observable<DotacaoOrcamentaria> {
    return this.http.post<DotacaoOrcamentaria>(`${this.baseURL}`, dotacaoorcarmentaria);
  }

  deletar(id: number): Observable<DotacaoOrcamentaria> {
    return this.http.delete<DotacaoOrcamentaria>(`${this.baseURL}/${id}`);
  }

  listarPorParams(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/consultar`, {
      params: parametros,
    });
  }

  listarProjetoatvAgrupado(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/projetoatividade`, {
      params: parametros,
    });
  }

  listarProjetoatvAgrupadoPorSecretarias(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/projetoatividadeporlistasecretaria`, {
      params: parametros,
    });
  }

  listarElementodespAgrupado(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/elementodespesa`, {
      params: parametros,
    });
  }

  listarOrgaoAgrupado(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/orgao`, {
      params: parametros,
    });
  }

  listarTodosOrgaoAgrupado(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/todosorgao`, {
      params: parametros,
    });
  }

  listarContratacaoOrgaoAgrupado(parametros: any): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/contratacao/orgao`, {
      params: parametros,
    });
  }

  listarDotacoesPorSecretaria(secretaria_id: number): Observable<DotacaoOrcamentaria[]> {
    return this.http.get<DotacaoOrcamentaria[]>(`${this.baseURL}/secretarias/${secretaria_id}`);
  }

  downloadQDD(): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/qdd`, {
      responseType: 'arraybuffer',
    });
  }
}
