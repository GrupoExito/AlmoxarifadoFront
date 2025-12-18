import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiaficService {
  baseURL = `${environment.siaficUrl}/siafic`;
  constructor(private http: HttpClient) {}

  enviarSiafic(data_inicial: string, data_final: string, modulo: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${data_inicial}/${data_final}/${modulo}`);
  }
}
