import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TermoReferenciaPAD } from '../_models/termo-referencia-pad.model';
import { ProcessoAdministrativo } from '@pages/processo-administrativo/_models/processo-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class TermoReferenciaPADService {
  baseURL = `${environment.apiLegacyUrl}/termoreferenciapad`;
  constructor(private http: HttpClient) {}

  consultarTermoReferenciaPorPad(tr_id: number): Observable<ProcessoAdministrativo> {
    return this.http.get<ProcessoAdministrativo>(`${this.baseURL}/listarPorTrId/${tr_id}`);
  }

  deletar(id: number): Observable<TermoReferenciaPAD[]> {
    return this.http.delete<TermoReferenciaPAD[]>(`${this.baseURL}/${id}`);
  }

  criar(planejamento: TermoReferenciaPAD): Observable<TermoReferenciaPAD> {
    return this.http.post<TermoReferenciaPAD>(`${this.baseURL}`, planejamento);
  }

  // listarProcessoAdm(processo_adm_id: number): Observable<ProcessoAdministrativo[]> {
  //   return this.http.get<ProcessoAdministrativo[]>(`${this.baseURL}/${processo_adm_id}`);
  // }

  listarSdPorProcessoAdm(processoAdm: number): Observable<TermoReferenciaPAD[]> {
    return this.http.get<TermoReferenciaPAD[]>(`${this.baseURL}/sdPor/${processoAdm}`);
  }
}
