import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AR3BIAIService {
  baseURL = `${environment.apiLegacyUrl}/AR3BIAI`;

  constructor(private http: HttpClient) {}

  enviar(pad_id: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/enviar/${pad_id}`, pad_id);
  }
}
