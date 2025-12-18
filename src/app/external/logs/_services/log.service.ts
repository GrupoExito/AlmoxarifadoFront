import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../_models/log.model';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  baseURL = `${environment.apiLegacyUrl}/log`;
  constructor(private http: HttpClient) {}

  inserirLog(log: any): Observable<Log> {
    return this.http.post<Log>(this.baseURL, log);
  }

  listarLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.baseURL);
  }
}
