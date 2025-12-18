import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudoTecnicoPreliminarPad } from '../_models/estudo-tecnico-preliminar-pad.model';

@Injectable({
  providedIn: 'root',
})
export class EstudoTecnicoPreliminarPadService {
  baseURL = `${environment.apiLegacyUrl}/estudotecnicopreliminarpad`;
  constructor(private http: HttpClient) {}

  consultarEstudoTecnicoPreliminarPorPad(etp_id: number): Observable<EstudoTecnicoPreliminarPad> {
    return this.http.get<EstudoTecnicoPreliminarPad>(`${this.baseURL}/listarPorEtpId/${etp_id}`);
  }

  deletar(id: number): Observable<EstudoTecnicoPreliminarPad[]> {
    return this.http.delete<EstudoTecnicoPreliminarPad[]>(`${this.baseURL}/${id}`);
  }

  criar(planejamento: EstudoTecnicoPreliminarPad): Observable<EstudoTecnicoPreliminarPad> {
    return this.http.post<EstudoTecnicoPreliminarPad>(`${this.baseURL}`, planejamento);
  }
}
