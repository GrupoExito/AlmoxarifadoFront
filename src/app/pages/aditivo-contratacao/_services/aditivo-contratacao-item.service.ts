import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AditivoContratacaoItem } from '../_models/aditivo-contratacao-item.model';

@Injectable({
  providedIn: 'root',
})
export class AditivoContratacaoItemService {
  baseURL = `${environment.apiLegacyUrl}/aditivocontratacaoitem`;
  constructor(private http: HttpClient) {}

  listarAditivoContratacaoItem(aditivo_contratacao_id: number): Observable<AditivoContratacaoItem[]> {
    return this.http.get<AditivoContratacaoItem[]>(`${this.baseURL}/${aditivo_contratacao_id}`);
  }

  // listarAditivoContratacaoAditivoItem(aditivo_contratacao_id: number, contratacao_id_id: number): Observable<AditivoContratacaoItem[]> {
  //   return this.http.get<AditivoContratacaoItem[]>(`${this.baseURL}/${aditivo_contratacao_id}/${contratacao_id_id}`);
  // }

  consultarAditivo(id: number): Observable<AditivoContratacaoItem> {
    return this.http.get<AditivoContratacaoItem>(`${this.baseURL}/consultar/${id}`);
  }

  adicionarItem(aditivoItem: AditivoContratacaoItem): Observable<AditivoContratacaoItem> {
    return this.http.post<AditivoContratacaoItem>(`${this.baseURL}`, aditivoItem);
  }

  deletarItem(id: number): Observable<AditivoContratacaoItem> {
    return this.http.delete<AditivoContratacaoItem>(`${this.baseURL}/${id}`);
  }
}
