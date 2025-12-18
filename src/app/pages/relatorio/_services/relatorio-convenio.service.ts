import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoConvenio } from '../_models/relatorio-convenio.model';



@Injectable({
  providedIn: 'root',
})
export class RelatorioConvenioService {
  baseURL = `${environment.apiLegacyUrl}/relatorioConvenio`;
  constructor(private http: HttpClient) {}

download(documento: ImpressaoDocumentoConvenio): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
