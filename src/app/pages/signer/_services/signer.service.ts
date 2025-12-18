import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assinatura } from '../_model/assinatura.model';

@Injectable({
  providedIn: 'root',
})
export class SignerService {
  baseURL = `${environment.apiLegacyUrl}/signer`;
  constructor(private http: HttpClient) {}

  getFile(idDocumento: string): Observable<Blob>{

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
      }),
    };

    return this.http.get<Blob>(`${this.baseURL}/download/${idDocumento}`, httpOptions);
  }

  getFileThumbnail(idDocumento: string, page: number): Observable<Blob>{

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
      }),
    };

    return this.http.get<Blob>(`${this.baseURL}/thumbnail/${idDocumento}/${page}`, httpOptions);
  }

  getFileInfo(idDocumento: string): Observable<number>{
     return this.http.get<number>(`${this.baseURL}/info/${idDocumento}`);
  }

  assinar(id: string, sign: Assinatura): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/${id}`, sign);
  }

}
