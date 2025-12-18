import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImplantacaoService {
  baseURL = `${environment.apiLegacyUrl}/implantacao`;
  constructor(private http: HttpClient) {}

  exportar(ano: number, mes: number, tipo: number): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/zip',
      }),
    };

    return this.http.get<Blob>(`${this.baseURL}/exportar/${ano}/${mes}/${tipo}`, httpOptions);
  }

  importarPlanilhaContratacao(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/importar/planilhacontratacao`, file);
  }

  importarPlanilhaContrato(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/importar/planilhacontrato`, file);
  }
}
