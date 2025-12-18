import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoAdministrativo } from '@pages/processo-administrativo/_models/processo-administrativo.model';
import { ContratacaoPA } from '../_models/contratacao-pa.model';

@Injectable({
  providedIn: 'root',
})
export class ContratacaoProcessoAdministrativoService {
  baseURL = `${environment.apiLegacyUrl}/contratacaoprocessoadministrativo`;
  constructor(private http: HttpClient) {}

  criar(contratacaoPA: ContratacaoPA): Observable<ContratacaoPA> {
    return this.http.post<ContratacaoPA>(`${this.baseURL}`, contratacaoPA);
  }

  consultarContratacaoPad(contratacao_id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/${contratacao_id}`);
  }

  deletar(id: number): Observable<ProcessoAdministrativo> {
    return this.http.delete<ProcessoAdministrativo>(`${this.baseURL}/${id}`);
  }
}
