import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoDispensa } from '../_models/relatorio-dispensa.model';
import { RelatorioDispensaSintetico, RelatorioDispensaAnalitico } from '../_models/relatorio-dispensa.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioDispensaService {
  baseURL = `${environment.apiLegacyUrl}/relatoriodispensa`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoDispensa): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  dispensaSintetico(documento: RelatorioDispensaSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sintetico`, documento, {
      responseType: 'arraybuffer',
    });
  }

  dispensaAnalitico(documento: RelatorioDispensaAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/analitico`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
