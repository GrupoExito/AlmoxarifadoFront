import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObraResponsavelTecnico } from '../_models/obra-responsavel-tecnico.model';


@Injectable({
  providedIn: 'root',
})
export class ObraResponsavelTecnicoService {
  
  baseURL = `${environment.apiLegacyUrl}/ObraResponsavelTecnico`;
  private routeId: number | null = null;
  public obraResponsavelTecnicoData = new BehaviorSubject<ObraResponsavelTecnico | null>(null);
  obra: any;
  data$ = this.obraResponsavelTecnicoData.asObservable();
  constructor(private http: HttpClient) {}

  listarTodos(obra_id: number): Observable<ObraResponsavelTecnico[]> {
    return this.http.get<ObraResponsavelTecnico[]>(`${this.baseURL}/${obra_id}`);
  }
  
  criar(obraResponsavelTecnico: ObraResponsavelTecnico): Observable<ObraResponsavelTecnico> {
    return this.http.post<ObraResponsavelTecnico>(`${this.baseURL}`, obraResponsavelTecnico);
  }

  consultar(id: number): Observable<ObraResponsavelTecnico> {
    return this.http.get<ObraResponsavelTecnico>(`${this.baseURL}/${id}`);
  }

  deletar(id: number): Observable<ObraResponsavelTecnico[]> {
    return this.http.delete<ObraResponsavelTecnico[]>(`${this.baseURL}/${id}`);
  }

}
