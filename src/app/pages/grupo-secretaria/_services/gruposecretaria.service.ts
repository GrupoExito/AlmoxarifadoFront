import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { GrupoSecretaria } from '../_models/gruposecretaria.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class GrupoSecretariaService {
    baseURL = `${environment.apiLegacyUrl}/grupoSecretaria`;
    constructor(private http: HttpClient) {}
  
    listarTodos(): Observable<GrupoSecretaria[]> {
      return this.http.get<GrupoSecretaria[]>(this.baseURL);
    }
  
    consultarPorId(id: number): Observable<GrupoSecretaria> {
      return this.http.get<GrupoSecretaria>(`${this.baseURL}/${id}`);
    }
  
    editar(id: number, grupoSecretaria: GrupoSecretaria): Observable<GrupoSecretaria> {
      return this.http.put<GrupoSecretaria>(`${this.baseURL}/${id}`, grupoSecretaria);
    }
  
    criar(grupoSecretaria: GrupoSecretaria): Observable<GrupoSecretaria> {
      return this.http.post<GrupoSecretaria>(`${this.baseURL}`, grupoSecretaria);
    }
  
    deletar(id: number): Observable<GrupoSecretaria> {
      return this.http.delete<GrupoSecretaria>(`${this.baseURL}/${id}`);
    }
  }
  