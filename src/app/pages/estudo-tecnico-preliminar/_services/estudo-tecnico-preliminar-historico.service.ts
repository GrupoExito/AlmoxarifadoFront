import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudoTecnicoPreliminarHistorico } from '../_models/estudo-tecnico-preliminar-historico.model';
@Injectable({
  providedIn: 'root',
})
export class EstudoTecnicoPreliminarHistoricoService {
  baseURL = `${environment.apiLegacyUrl}/EstudoTecnicoPreliminarHistorico`;
  constructor(private http: HttpClient) {}

  listarTodos(pca_id: number): Observable<EstudoTecnicoPreliminarHistorico[]> {
    return this.http.get<EstudoTecnicoPreliminarHistorico[]>(`${this.baseURL}/${pca_id}`);
  }

  salvarObservacao(obeservacao: EstudoTecnicoPreliminarHistorico): Observable<EstudoTecnicoPreliminarHistorico> {
    return this.http.post<EstudoTecnicoPreliminarHistorico>(`${this.baseURL}/observacao`, obeservacao);
  }
}
