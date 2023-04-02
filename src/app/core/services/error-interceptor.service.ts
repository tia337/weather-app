import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError,  } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMsg = `Bad Request.`;
              break;
            case 404:
              errorMsg = `The requested resource does not exist.`;
              break;
            case 500:
              errorMsg = `Internal Server Error.`;
              break;
            case 503:
              errorMsg = `The requested service is not available.`;
              break;
            default:
              errorMsg = 'Something went wrong!';
          }
        }

        alert(`API ERROR: ${errorMsg}`);

        return throwError(() => error);
      })
    );
  }


}
