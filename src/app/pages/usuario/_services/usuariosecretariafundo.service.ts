import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecretariaFundo } from '../_models/secretariafundo.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSecretariaFundoService {
  baseURL = `${environment.apiLegacyUrl}/secretariafundo`;
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<SecretariaFundo[]> {
    return this.http.get<SecretariaFundo[]>(this.baseURL);
  }

  listarPorUsuario(usuario_id: number) {
    return this.http.get<SecretariaFundo>(`${this.baseURL}/usuario/${usuario_id}`);
  }
}
