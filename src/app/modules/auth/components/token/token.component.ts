import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AuthHTTPService } from '../../services/auth-http/auth-http.service';
import { PermissionService } from '../../services/permission.model';

@Component({
  selector: 'app-token-auth',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenAuthComponent implements OnInit, OnDestroy {
  hasError = false;
  private loginSub?: Subscription;

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private authHttpService: AuthHTTPService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // se já está logado, redireciona
    if (this.authService.getToken('auth-token')) {
      const isFromApp = navigator.userAgent.includes('CompraAgilApp');
      this.router.navigate([isFromApp ? '/external/dashboard-app' : '/']);
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.hasError = true;
      // opcional: já manda pro login
      // this.router.navigate(['/auth/login']);
      return;
    }

    this.loginSub = this.authHttpService.loginToken(token).subscribe({
      next: (user) => {
        if (!user) {
          this.hasError = true;
          return;
        }

        this.authService.saveToken(user.token);
        this.authService.savePermissionToken(user.tokenPermissao);
        this.authService.saveUser(user);
        this.permissionService.setPermissao();

        window.location.reload();
      },
      error: (error) => {
        this.hasError = true;

        if (error?.error?.bloqueio_financeiro) {
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
          }).then(() => this.router.navigate(['/auth/login']));
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}