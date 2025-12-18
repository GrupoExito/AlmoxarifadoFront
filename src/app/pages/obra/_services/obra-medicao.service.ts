import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObraMedicao } from '../_models/obra-medicao.model';


@Injectable({
  providedIn: 'root',
})
export class ObraMedicaoService {
  
  baseURL = `${environment.apiLegacyUrl}/Obramedicao`;
  private routeId: number | null = null;
  public obraMedicaoData = new BehaviorSubject<ObraMedicao | null>(null);
  obra: any;
  data$ = this.obraMedicaoData.asObservable();
  constructor(private http: HttpClient) {}

  listarTodos(obra_id: number): Observable<ObraMedicao[]> {
    return this.http.get<ObraMedicao[]>(`${this.baseURL}/${obra_id}`);
  }
  
  criar(obraMedicao: ObraMedicao): Observable<ObraMedicao> {
    return this.http.post<ObraMedicao>(`${this.baseURL}`, obraMedicao);
  }

  consultar(id: number): Observable<ObraMedicao> {
    return this.http.get<ObraMedicao>(`${this.baseURL}/${id}`);
  }
  deletar(id: number): Observable<ObraMedicao[]> {
    return this.http.delete<ObraMedicao[]>(`${this.baseURL}/${id}`);
  }

}
