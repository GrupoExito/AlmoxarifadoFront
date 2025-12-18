import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudoTecnicoPreliminarAnexo } from '../_models/estudo-tecnico-preliminar-anexo.model';

@Injectable({
  providedIn: 'root',
})
export class EstudoTecnicoPreliminarAnexoService {
  baseURL = `${environment.apiLegacyUrl}/estudotecnicopreliminaranexo`;
  constructor(private http: HttpClient) {}

  listarTodos(etp_id: number): Observable<EstudoTecnicoPreliminarAnexo[]> {
    return this.http.get<EstudoTecnicoPreliminarAnexo[]>(`${this.baseURL}/${etp_id}`);
  }

  salvarAnexo(anexo: FormData): Observable<EstudoTecnicoPreliminarAnexo> {
    return this.http.post<EstudoTecnicoPreliminarAnexo>(`${this.baseURL}`, anexo);
  }

  download(etp_id: number): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseURL}/download/${etp_id}`, {
      responseType: 'arraybuffer',
    });
  }

  deletar(id: number): Observable<EstudoTecnicoPreliminarAnexo> {
    return this.http.delete<EstudoTecnicoPreliminarAnexo>(`${this.baseURL}/${id}`);
  }
}
