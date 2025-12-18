import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpressaoDocumentoAditivo } from '../_models/aditivo.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioAditivoService {
  baseURL = `${environment.apiLegacyUrl}/relatorioaditivo`;
  constructor(private http: HttpClient) {}

  download(documento: ImpressaoDocumentoAditivo): Observable<ArrayBuffer> {
    return this.http.post(`${this.baseURL}/impressao`, documento, {
      responseType: 'arraybuffer',
    });
  }
}
