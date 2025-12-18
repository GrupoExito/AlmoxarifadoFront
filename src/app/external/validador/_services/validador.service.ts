import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticadorArquivo } from '../_models/autenticadorarquivo.model';
import { AutenticadorArquivoAssinatura } from '../_models/autenticadorarquivoassinatura.model';

@Injectable({
  providedIn: 'root',
})
export class ValidadorService {
  baseURL = `${environment.apiLegacyUrl}/signer`;
  constructor(private http: HttpClient) {}

  getFile(idDocumento: string): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
      }),
    };

    return this.http.get<Blob>(`${this.baseURL}/download/${idDocumento}`, httpOptions);
  }

  getFileThumbnail(idDocumento: string, page: number): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
      }),
    };

    return this.http.get<Blob>(`${this.baseURL}/thumbnail/${idDocumento}/${page}`, httpOptions);
  }

  getFileInfo(idDocumento: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/info/${idDocumento}`);
  }

  getDocumento(idDocumento: string): Observable<AutenticadorArquivo> {
    return this.http.get<AutenticadorArquivo>(`${this.baseURL}/docinfo/${idDocumento}`);
  }

  getAssinaturas(idDocumento: string): Observable<AutenticadorArquivoAssinatura[]> {
    return this.http.get<AutenticadorArquivoAssinatura[]>(`${this.baseURL}/assinaturas/${idDocumento}`);
  }

  getAssinaturasDFD(sd_id: number, tipo_documento: string): Observable<AutenticadorArquivoAssinatura[]> {
    return this.http.get<AutenticadorArquivoAssinatura[]>(
      `${this.baseURL}/assinaturas/dfd/${sd_id}?tipo_documento=${tipo_documento}`
    );
  }
}
