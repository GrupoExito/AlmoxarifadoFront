import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObraOrdemServico } from '../_models/obra-ordem-servico.model';


@Injectable({
  providedIn: 'root',
})
export class ObraOrdemServicoService {
  
  baseURL = `${environment.apiLegacyUrl}/ObraOrdemServico`;
  private routeId: number | null = null;
  public obraOSData = new BehaviorSubject<ObraOrdemServico | null>(null);
  obra: any;
  data$ = this.obraOSData.asObservable();
  constructor(private http: HttpClient) {}

  listarTodos(obra_id: number): Observable<ObraOrdemServico[]> {
    return this.http.get<ObraOrdemServico[]>(`${this.baseURL}/${obra_id}`);
  }
  
  criar(obraOS: ObraOrdemServico): Observable<ObraOrdemServico> {
    return this.http.post<ObraOrdemServico>(`${this.baseURL}`, obraOS);
  }

  consultar(id: number): Observable<ObraOrdemServico> {
    return this.http.get<ObraOrdemServico>(`${this.baseURL}/${id}`);
  }
  deletar(id: number): Observable<ObraOrdemServico[]> {
    return this.http.delete<ObraOrdemServico[]>(`${this.baseURL}/${id}`);
  }

}





