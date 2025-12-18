import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ImpressaoDocumentoInexigibilidade,
  RelatorioInexigibilidadeAnalitico,
  RelatorioInexigibilidadeSintetico,
} from '../_models/relatorio-inexigibilidade.model ';
@Injectable({
  providedIn: 'root',
})
export class RelatorioInexigibilidadeService {
  baseURL = `${environment.apiLegacyUrl}/relatorioinexigibilidade`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoInexigibilidade): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }

  inexigibilidadeSintetico(documento: RelatorioInexigibilidadeSintetico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/sintetico`, documento, {
      responseType: 'arraybuffer',
    });
  }

  inexigibilidadeAnalitico(documento: RelatorioInexigibilidadeAnalitico): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/analitico`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
