import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Obra } from '../_models/obra.model';
import { ObraData, ObraDataEtapasHeader } from '../_models/obra-data.model';

@Injectable({
  providedIn: 'root',
})
export class ObraService {
  public obraData = new BehaviorSubject<ObraData | null>(null);
  public obraDataEtapasHeader = new BehaviorSubject<Partial<ObraDataEtapasHeader> | null>(null);
  data$ = this.obraData.asObservable();
  dataEtapasHeader$ = this.obraDataEtapasHeader.asObservable();
  baseURL = `${environment.apiLegacyUrl}/obra`;
  private routeId: number | null = null;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Obra[]> {
    return this.http.get<Obra[]>(this.baseURL);
  }

  consultarObra(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.baseURL}/${id}`);
  }
  
  editar(id: number, obra: Partial<Obra>): Observable<Obra> {
    return this.http.put<Obra>(`${this.baseURL}/${id}`, obra);
  }
 
  criar(obras: Obra): Observable<Obra> {
    return this.http.post<Obra>(`${this.baseURL}`, obras);
  }

  deletar(id: number): Observable<Obra> {
    return this.http.delete<Obra>(`${this.baseURL}/${id}`);
  }

  setRouteId(number: number | null): void {
    this.routeId = number;
  }

  getRouteId(): number | null {
    return this.routeId;
  }

  setObra(obraData: ObraData | null) {
    this.obraData.next(obraData);
  }

  // setEtapasHeader(dataEtapasHeader: ObraDataEtapasHeader | null) {
  //   this.obraDataEtapasHeader.next(dataEtapasHeader);
  // }

  setEtapasHeader(dataEtapasHeader: Partial<ObraDataEtapasHeader> | null) {
    this.obraDataEtapasHeader.forEach((data) => {
      if (data && dataEtapasHeader) {
        Object.keys(data).forEach((props) => {
          if (!dataEtapasHeader.hasOwnProperty(props)) {
            dataEtapasHeader[props as keyof ObraDataEtapasHeader] = data[props as keyof ObraDataEtapasHeader];
          }
        });
      }
    });

    this.obraDataEtapasHeader.next(dataEtapasHeader);
  }

  filtrar(parameters: any): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.baseURL}/filtrar`, {
      params: parameters,
    });
  }
}
