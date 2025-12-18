import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObraAcompanhamento } from '../_models/obra-acompamento.model';


@Injectable({
  providedIn: 'root',
})
export class ObraAcompanhamentoService {
  
  baseURL = `${environment.apiLegacyUrl}/ObraAcompanhamento`;
  private routeId: number | null = null;
  public obraAcompanhamentoData = new BehaviorSubject<ObraAcompanhamento | null>(null);
  obra: any;
  data$ = this.obraAcompanhamentoData.asObservable();
  constructor(private http: HttpClient) {}

  listarTodos(obra_id: number): Observable<ObraAcompanhamento[]> {
    return this.http.get<ObraAcompanhamento[]>(`${this.baseURL}/${obra_id}`);
  }
  
  criar(obraAcompanhamento: ObraAcompanhamento): Observable<ObraAcompanhamento> {
    return this.http.post<ObraAcompanhamento>(`${this.baseURL}`, obraAcompanhamento);
  }

  consultar(id: number): Observable<ObraAcompanhamento> {
    return this.http.get<ObraAcompanhamento>(`${this.baseURL}/${id}`);
  }

  deletar(id: number): Observable<ObraAcompanhamento[]> {
    return this.http.delete<ObraAcompanhamento[]>(`${this.baseURL}/${id}`);
  }

}
