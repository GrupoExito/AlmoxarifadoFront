import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoContratacaoAditivo } from '../_models/aditivo-contratacao.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioAditivoContratacaoService {
  baseURL = `${environment.apiLegacyUrl}/relatorioaditivocontratacao`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoContratacaoAditivo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
