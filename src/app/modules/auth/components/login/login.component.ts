import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '@pages/pessoa/_models/usuario.model';
import { Cliente } from '../../models/cliente.model';
import Swal from 'sweetalert2';
import { AuthHTTPService } from '../../services/auth-http/auth-http.service';
import { PermissionService } from '../../services/permission.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  clientes: Cliente[];
  loginForm: FormGroup;
  hasError: boolean;
  hasManyUsers: boolean = false;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  loginSubscr$: Subscription;
  loginSubscr2$: Subscription;
  usuario: Usuario;
  externalToken: string | null = null;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private permissionService: PermissionService,
    private authHttpService: AuthHTTPService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.getToken('auth-token')) {
      const userAgent = navigator.userAgent;
      const isFromApp = userAgent.includes('CompraAgilApp');

      if (isFromApp) {
        this.router.navigate(['/external/dashboard-app']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    const tokenFromQuery = this.route.snapshot.queryParamMap.get('token');
      if (tokenFromQuery) {
        this.externalToken = tokenFromQuery;
        console.log('Token recebido via redirect:', this.externalToken);


        this.loginSubscr2$ = this.authHttpService.loginToken(this.externalToken).subscribe(
              (user) => {
                if (user) {
                  this.authService.saveToken(user.token);
                  this.authService.savePermissionToken(user.tokenPermissao);
                  this.authService.saveUser(user);
                  this.permissionService.setPermissao();
                  window.location.reload();
                } else {
                  this.hasError = true;
                }
              },
              (error) => {
                if (error.error.bloqueio_financeiro) {
                  Swal.fire({
                    title: 'Acesso Temporariamente Bloqueado',
                    html: `
                      <p>Identificamos uma pendência em seu cadastro. Por isso, o acesso ao sistema foi temporariamente suspenso.</p>
                      <p>Para regularizar sua situação e restabelecer o acesso, entre em contato conosco.</p>
                      <p>📞 Contato: <a href="mailto:comercial@grupoexito.com.br">comercial@grupoexito.com.br</a> | (71) 99169-1844</p>
                      <p>Agradecemos a sua compreensão.</p>
                    `,
                    icon: 'warning',
                    confirmButtonText: 'Entendi',
                    confirmButtonColor: '#d33',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }
            );

      }else {
        console.log('Nenhum token recebido:');
      }

    if (!environment.production) {
      this.loginForm.patchValue({
        email: environment.usuarioLogar || '',
        password: environment.senhaLogar || '',
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(320)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      cliente_id: [''],
    });
  }

  submit() {
    Swal.showLoading();
    if (!this.hasManyUsers) {
      this.usuario = {
        login: this.f.email.value,
        password: this.f.password.value,
      };
      this.loginSubscr$ = this.authService.listarClientes(this.usuario).subscribe({
        next: (clientes) => {
          if (clientes.length > 1) {
            Swal.close();
            this.f.email.disable();
            this.f.password.disable();
            this.clientes = clientes;
            this.hasManyUsers = true;
          } else if (clientes.length == 1) {
            this.usuario = {
              login: this.f.email.value,
              password: this.f.password.value,
              cliente_id: clientes[0].id,
            };
            this.loginSubscr2$ = this.authHttpService.loginUser(this.usuario).subscribe(
              (user) => {
                if (user) {
                  this.authService.saveToken(user.token);
                  this.authService.savePermissionToken(user.tokenPermissao);
                  this.authService.saveUser(user);
                  this.permissionService.setPermissao();
                  window.location.reload();
                } else {
                  this.hasError = true;
                }
              },
              (error) => {
                if (error.error.bloqueio_financeiro) {
                  Swal.fire({
                    title: 'Acesso Temporariamente Bloqueado',
                    html: `
                      <p>Identificamos uma pendência em seu cadastro. Por isso, o acesso ao sistema foi temporariamente suspenso.</p>
                      <p>Para regularizar sua situação e restabelecer o acesso, entre em contato conosco.</p>
                      <p>📞 Contato: <a href="mailto:comercial@grupoexito.com.br">comercial@grupoexito.com.br</a> | (71) 99169-1844</p>
                      <p>Agradecemos a sua compreensão.</p>
                    `,
                    icon: 'warning',
                    confirmButtonText: 'Entendi',
                    confirmButtonColor: '#d33',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }
            );
            this.unsubscribe.push(this.loginSubscr2$);
            Swal.close();
          } else {
            Swal.fire('Erro', 'Usuário não vinculado a nenhum município', 'error');
          }
        },
        error: (err) => {
          Swal.fire('Erro', 'Usuário ou senha incorretos', 'error');
          console.log(err);
        },
      });
    } else if (this.hasManyUsers) {
      this.usuario = {
        login: this.f.email.value,
        password: this.f.password.value,
        cliente_id: this.f.cliente_id.value,
      };
      this.loginSubscr2$ = this.authHttpService.loginUser(this.usuario).subscribe(
        (user) => {
          if (user) {
            this.authService.saveToken(user.token);
            this.authService.savePermissionToken(user.tokenPermissao);
            this.authService.saveUser(user);
            this.permissionService.setPermissao();
            Swal.close();
            window.location.reload();
          } else {
            this.hasError = true;
          }
        },
        (error) => {
          if (error.error.bloqueio_financeiro) {
            Swal.fire({
              title: 'Acesso Temporariamente Bloqueado',
              html: `
                <p>Identificamos uma pendência em seu cadastro. Por isso, o acesso ao sistema foi temporariamente suspenso.</p>
                <p>Para regularizar sua situação e restabelecer o acesso, entre em contato conosco.</p>
                <p>📞 Contato: <a href="mailto:comercial@grupoexito.com.br">comercial@grupoexito.com.br</a> | (71) 99169-1844</p>
                <p>Agradecemos a sua compreensão.</p>
              `,
              icon: 'warning',
              confirmButtonText: 'Entendi',
              confirmButtonColor: '#d33',
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        }
      );
      this.unsubscribe.push(this.loginSubscr2$);
    }
    this.unsubscribe.push(this.loginSubscr$);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
