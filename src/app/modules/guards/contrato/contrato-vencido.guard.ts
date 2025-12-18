import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PedidoCompraService } from '@pages/compra/_services/pedido-compra.service';
import { ContratoService } from '@pages/contrato/_services/contrato.service';
import { BaseService } from '@pages/shared/services/base.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContratoVencidoGuard implements CanActivate {
  constructor(
    private router: Router,
    private contratoService: ContratoService,
    private routeActive: ActivatedRoute,
    private pedidoCompraService: PedidoCompraService,
    private baseService: BaseService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('guard');

    const id = Number(next.parent?.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['']);
      return false;
    }

    return this.pedidoCompraService.consultarPedidoCompra(id).pipe(
      switchMap((pedido) => {
        if (!pedido.contrato_id) {
          return of(true);
        }

        return this.contratoService.consultarContrato(pedido.contrato_id).pipe(
          map((con) => {
            const dataHoje = new Date(pedido.data_solicitacao);
            const dataValidadeContrato = new Date(con.data_validade_contrato);

            if (dataHoje > dataValidadeContrato) {
              Swal.fire('Erro!', 'Contrato vencido, não é possivel fazer alterações!', 'error').then(() => {
                this.router.navigateByUrl('/dashboard');
                return false;
              });
            }
            return true;
          }),
          catchError(() => {
            this.router.navigateByUrl('/dashboard');
            return of(false);
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }

  // return new Observable<boolean>((obs) => {
  //   this.contratoService.consultarContrato(id).subscribe({
  //     next: (con) => {
  //       console.log(con);
  //       // const contrato = con;
  //       // console.log('guard', contrato);
  //       // if (contrato.flstatus_id == Status.Confirmado) {
  //       //   Swal.fire('Erro!', 'Status do contrato é CONFIRMADO, não é possivel fazer alterações!', 'error').then(
  //       //     () => {
  //       //       this.router.navigateByUrl('/dashboard');
  //       //       obs.next(false);
  //       //     }
  //       //   );
  //       // }
  //       obs.next(true);
  //     },
  //     error: () => {
  //       this.router.navigateByUrl('/dashboard');
  //       obs.next(false);
  //     },
  //   });
  // });
}
