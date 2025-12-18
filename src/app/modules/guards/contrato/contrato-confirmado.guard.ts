import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ContratoService } from '@pages/contrato/_services/contrato.service';
import { Status } from '@pages/shared/models/fluxo.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContratoConfirmadoGuard implements CanActivate {
  constructor(private router: Router, private contratoService: ContratoService, private routeActive: ActivatedRoute) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = Number(next.parent?.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['']);
      return false;
    }

    return new Observable<boolean>((obs) => {
      this.contratoService.consultarContrato(id).subscribe({
        next: (con) => {
          const contrato = con;
          if (contrato.flstatus_id == Status.Confirmado) {
            Swal.fire('Erro!', 'Status do contrato é CONFIRMADO, não é possivel fazer alterações!', 'error').then(
              () => {
                this.router.navigateByUrl('/dashboard');
                obs.next(false);
              }
            );
          }
          obs.next(true);
        },
        error: () => {
          this.router.navigateByUrl('/dashboard');
          obs.next(false);
        },
      });
    });
  }
}
