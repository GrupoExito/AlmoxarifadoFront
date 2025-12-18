import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObraLicencaAmbiental } from '../_models/obra-licenca-ambiental.model';


@Injectable({
  providedIn: 'root',
})
export class ObraLicencaAmbientalService {
  
  baseURL = `${environment.apiLegacyUrl}/ObraLicencaAmbiental`;
  private routeId: number | null = null;
  public obraLicencaAmbientalData = new BehaviorSubject<ObraLicencaAmbiental | null>(null);
  obra: any;
  data$ = this.obraLicencaAmbientalData.asObservable();
  constructor(private http: HttpClient) {}

  listarTodos(obra_id: number): Observable<ObraLicencaAmbiental[]> {
    return this.http.get<ObraLicencaAmbiental[]>(`${this.baseURL}/${obra_id}`);
  }
  
  criar(obraLicencaAmbiental: ObraLicencaAmbiental): Observable<ObraLicencaAmbiental> {
    return this.http.post<ObraLicencaAmbiental>(`${this.baseURL}`, obraLicencaAmbiental);
  }

  consultar(id: number): Observable<ObraLicencaAmbiental> {
    return this.http.get<ObraLicencaAmbiental>(`${this.baseURL}/${id}`);
  }
  deletar(id: number): Observable<ObraLicencaAmbiental[]> {
    return this.http.delete<ObraLicencaAmbiental[]>(`${this.baseURL}/${id}`);
  }

}
