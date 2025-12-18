import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AditivoAnexo } from '../_models/aditivo-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class AditivoAnexoService {
  baseURL = `${environment.apiLegacyUrl}/aditivoanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(aditivo_id: number): Observable<AditivoAnexo[]> {
    return this.http.get<AditivoAnexo[]>(`${this.baseURL}/${aditivo_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<AditivoAnexo> {
    return this.http.post<AditivoAnexo>(`${this.baseURL}`, anexo);
  }

  download(aditivo_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${aditivo_id}`, {
      responseType: 'arraybuffer',
    });
  }
}
