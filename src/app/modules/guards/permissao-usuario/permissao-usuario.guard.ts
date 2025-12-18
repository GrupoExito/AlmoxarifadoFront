import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../../auth/services/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissaoUsuarioGuard implements CanActivate {
  constructor(private router: Router, private permissionService: PermissionService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let validacaoPermissao = this.permissionService.validarPermissao(
      next.data.permissao.tela,
      next.data.permissao.acao
    );

    if (!validacaoPermissao) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
