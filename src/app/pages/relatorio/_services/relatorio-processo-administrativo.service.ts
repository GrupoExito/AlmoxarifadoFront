import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoProcessoAdministrativo } from '../_models/relatorio-processo-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioProcessoAdministrativoService {
  baseURL = `${environment.apiLegacyUrl}/relatorioprocessoadministrativo`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoProcessoAdministrativo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
  
}
