import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoAdministrativoSDs } from '../_models/processo-administrativo-sds.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessoAdministrativoSDsService {
  baseURL = `${environment.apiLegacyUrl}/processoadministrativosd`;
  constructor(private http: HttpClient) {}

  listarTodos(pa_id: number): Observable<ProcessoAdministrativoSDs[]> {
    return this.http.get<ProcessoAdministrativoSDs[]>(`${this.baseURL}/listarPorPadId/${pa_id}`);
  }

  deletar(id: number): Observable<ProcessoAdministrativoSDs[]> {
    return this.http.delete<ProcessoAdministrativoSDs[]>(`${this.baseURL}/${id}`);
  }

  criar(planejamento: ProcessoAdministrativoSDs): Observable<ProcessoAdministrativoSDs> {
    return this.http.post<ProcessoAdministrativoSDs>(`${this.baseURL}`, planejamento);
  }
}
