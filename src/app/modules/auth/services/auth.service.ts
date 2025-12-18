import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '@pages/pessoa/_models/usuario.model';
import { ClienteToken, Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { AuthToken, ControleAcesso, PermissionToken } from '../models/auth.model';

export type UserType = UserModel | undefined;
export type ClientUserType = ClienteToken | undefined;

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const TOKEN_PERMISSION = 'permission-token';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  baseURL = `${environment.apiLegacyUrl}/usuario`;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public savePermissionToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_PERMISSION);
    window.sessionStorage.setItem(TOKEN_PERMISSION, token);
  }

  public getToken(token: string): string | null {
    return window.sessionStorage.getItem(token);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  getDecodedAccessToken(): AuthToken | null {
    const token = this.getToken(TOKEN_KEY);
    try {
      return jwt_decode(token!);
    } catch (Error) {
      return null;
    }
  }

  private getDecodedPermissionToken(): PermissionToken | null {
    const token = this.getToken(TOKEN_PERMISSION);
    try {
      return jwt_decode(token!);
    } catch (Error) {
      return null;
    }
  }

  getPermissionTokenParse(): ControleAcesso[] | null {
    const token = this.getDecodedPermissionToken();
    try {
      return JSON.parse(token?.permission!);
    } catch (Error) {
      return null;
    }
  }

  // need create new user then login
  // registration(user: UserModel): Observable<any> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.createUser(user).pipe(
  //     map(() => {
  //       this.isLoadingSubject.next(false);
  //     }),
  //     switchMap(() => this.login(user.email, user.password)),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  // forgotPassword(email: string): Observable<boolean> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.forgotPassword(email).pipe(finalize(() => this.isLoadingSubject.next(false)));
  // }

  // private methods
  // private setAuthFromLocalStorage(auth: AuthModel): boolean {
  //   // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  //   if (auth && auth.authToken) {
  //     localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
  //     return true;
  //   }
  //   return false;
  // }

  // private getAuthFromLocalStorage(): AuthModel | undefined {
  //   try {
  //     const lsValue = localStorage.getItem(this.authLocalStorageToken);
  //     if (!lsValue) {
  //       return undefined;
  //     }

  //     const authData = JSON.parse(lsValue);
  //     return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  // loginUser(usuario: Usuario): Observable<ClienteToken> {
  //   return this.http
  //     .post<ClienteToken>(`${this.baseURL}/autenticacaop2`, usuario)
  //     .pipe(tap((res) => this.setSession(res)));
  // }

  private setSession(authResult: ClienteToken) {
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);
    sessionStorage.setItem('id_token', authResult.token);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  listarClientes(usuario: Usuario): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(`${this.baseURL}/autenticacaop1`, usuario);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
