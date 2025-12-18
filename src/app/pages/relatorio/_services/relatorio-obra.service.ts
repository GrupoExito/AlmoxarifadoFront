import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoObra } from '../_models/relatorio-obra.model';


@Injectable({
  providedIn: 'root',
})
export class RelatorioObraService {
  baseURL = `${environment.apiLegacyUrl}/relatorioObra`;
  constructor(private http: HttpClient) {}

download(documento: ImpressaoDocumentoObra): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }


}
