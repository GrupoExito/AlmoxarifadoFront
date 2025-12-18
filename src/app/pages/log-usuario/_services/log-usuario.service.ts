import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoAndamento } from '../_models/log.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessoAndamentoService {
  baseURL = `${environment.apiLegacyUrl}/processoandamento`;
  constructor(private http: HttpClient) {}

  incluirProdutoDFD(processo: ProcessoAndamento): Observable<ProcessoAndamento> {
    return this.http.post<ProcessoAndamento>(`${this.baseURL}/incluirprodutodfd`, processo);
  }

  excluirProdutoDFD(processo: ProcessoAndamento): Observable<ProcessoAndamento> {
    return this.http.post<ProcessoAndamento>(`${this.baseURL}/excluirprodutodfd`, processo);
  }

  alterarQuantidadeProdutoDFD(processo: ProcessoAndamento): Observable<ProcessoAndamento> {
    return this.http.post<ProcessoAndamento>(`${this.baseURL}/alterarquantidadeprodutodfd`, processo);
  }
}
