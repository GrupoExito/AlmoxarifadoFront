import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtaAnexo } from '../_models/ata-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class AtaAnexoService {
  baseURL = `${environment.apiLegacyUrl}/ataanexo`;
  constructor(private http: HttpClient) {}

  listarTodos(ata_id: number): Observable<AtaAnexo[]> {
    return this.http.get<AtaAnexo[]>(`${this.baseURL}/${ata_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<AtaAnexo> {
    return this.http.post<AtaAnexo>(`${this.baseURL}`, anexo);
  }

  download(sd_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${sd_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<AtaAnexo> {
    return this.http.delete<AtaAnexo>(`${this.baseURL}/${id}`);
  }
}
