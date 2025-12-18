import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatorioItemPorTipo } from '../_models/relatorio-item.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioItemService {
  baseURL = `${environment.apiLegacyUrl}/relatorioitem`;
  constructor(private http: HttpClient) {}

  gerarRelatorioItemPorTipo(relatorio: RelatorioItemPorTipo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ItemTipo`, relatorio, {
      responseType: 'arraybuffer',
    });
  }
  
  gerarRelatorioItemPorTipoExcel(relatorio: RelatorioItemPorTipo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/ItemTipoExcel`, relatorio, {
      responseType: 'arraybuffer',
    });
  }

}
