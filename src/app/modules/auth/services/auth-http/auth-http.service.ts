import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { Usuario } from '@pages/pessoa/_models/usuario.model';
import { ClienteToken } from '../../models/cliente.model';

const API_USERS_URL = `${environment.apiLegacyUrl}/usuario`;
@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  baseURL = `${environment.apiLegacyUrl}/usuario`;
  // public methods
  loginUser(usuario: Usuario): Observable<ClienteToken> {
    return this.http.post<ClienteToken>(`${this.baseURL}/autenticacaop2`, usuario);
  }

loginToken(token: string): Observable<ClienteToken> {
  return this.http.post<ClienteToken>(
    `${this.baseURL}/autenticacaoToken`,
    JSON.stringify(token),
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  );
}

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
