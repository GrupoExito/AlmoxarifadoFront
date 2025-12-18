import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Convenio } from '../_models/convenio.model';
import { ConvenioData, ConvenioDataEtapasHeader } from '../_models/convenio-data.model';
import { ConvenioSituacao } from '../_models/convenio-situacao.model';


@Injectable({
  providedIn: 'root',
})
export class ConvenioSituacaoService {
  
  baseURL = `${environment.apiLegacyUrl}/ConvenioSituacao`;
  private routeId: number | null = null;
  public convenioSituacaoData = new BehaviorSubject<ConvenioSituacao | null>(null);
  convenio: any;
  data$ = this.convenioSituacaoData.asObservable();
  constructor(private http: HttpClient) {}

  listarSituacao(convenio_id: number): Observable<ConvenioSituacao[]> {
    return this.http.get<ConvenioSituacao[]>(`${this.baseURL}/listarPorConvenioId/${convenio_id}`);
  }
  
  criarSituacao(convenioSituacao: ConvenioSituacao): Observable<ConvenioSituacao> {
    return this.http.post<ConvenioSituacao>(`${this.baseURL}`, convenioSituacao);
  }

  consultarPorId(id: number): Observable<ConvenioSituacao> {
    return this.http.get<ConvenioSituacao>(`${this.baseURL}/${id}`);
  }

  // deletar(id: number): Observable<ConvenioSituacao> {
  //   return this.http.delete<ConvenioSituacao>(`${this.baseURL}/${id}`);
  // }
  // editar( id: number,convenioSituacao: Partial<ConvenioSituacao>): Observable<ConvenioSituacao> {
  //   return this.http.put<ConvenioSituacao>(`${this.baseURL}/${id}`, convenioSituacao);
  // }
  
}





