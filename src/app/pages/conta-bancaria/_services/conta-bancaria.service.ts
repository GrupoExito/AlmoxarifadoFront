import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaBancaria } from '../_models/conta-bancaria.model';

@Injectable({
  providedIn: 'root',
})
export class ContaBancariaService {
  baseURL = `${environment.apiLegacyUrl}/Contabancaria`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ContaBancaria[]> {
    return this.http.get<ContaBancaria[]>(this.baseURL);
  }

  consultarPorId(id: number): Observable<ContaBancaria> {
    return this.http.get<ContaBancaria>(`${this.baseURL}/${id}`);
  }

  editar(id: number, contaBancaria: ContaBancaria): Observable<ContaBancaria> {
    return this.http.put<ContaBancaria>(`${this.baseURL}/${id}`, contaBancaria);
  }

  criar(contaBancaria: ContaBancaria): Observable<ContaBancaria> {
    return this.http.post<ContaBancaria>(`${this.baseURL}`, contaBancaria);
  }

  deletar(id: number): Observable<ContaBancaria> {
    return this.http.delete<ContaBancaria>(`${this.baseURL}/${id}`);
  }
}
