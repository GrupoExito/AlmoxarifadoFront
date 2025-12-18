import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { LogService } from 'src/app/external/logs/_services/log.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logService: LogService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // console.log('e', err);
        // console.log('req', request);
        // console.log('params', request.params);
        // console.log('body', request.body);
        // const error = err.error.message || err.statusText;
        // return throwError(error);

        if (err instanceof HttpErrorResponse && err.status === 401) {
          // Opcional: limpar credenciais/tokens
          localStorage.removeItem('auth-token');

          // Evita loop caso já esteja na /login
          const currentUrl = this.router.url || '/';
          if (!currentUrl.startsWith('/auth/login')) {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: currentUrl } });
          }
        }

        if (request.url.includes('/api/log')) {
          return throwError(null);
        }
        const log: any = {
          err: JSON.stringify(err),
          request: JSON.stringify(request),
          param: JSON.stringify(request.params),
          body: JSON.stringify(request.body),
          message: JSON.stringify(err.error) || JSON.stringify(err.statusText),
        };
        console.log('log', log);
        this.logService
          .inserirLog(log)
          .pipe(first())
          .subscribe({
            next: () => {},
            error: () => {},
          });
        return throwError(err);
      })
    );
  }
}
export const errorInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }];
