import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoEstudoTecnicoPreliminar } from '../_models/relatorio-estudo-tecnico-preliminar.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioEstudoTecnicoPreliminarService {
  baseURL = `${environment.apiLegacyUrl}/relatorioestudotecnicopreliminar`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoEstudoTecnicoPreliminar): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
