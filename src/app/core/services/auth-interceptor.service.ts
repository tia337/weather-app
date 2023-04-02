import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.enrichWithToken(req);

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status !== 204) {
          return event.clone({ body: event.body.data });
        }
        return event;
      })
    );
  }

  private enrichWithToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = environment.token;

    if (token) return req.clone({setParams: {'appid': token}});

    return req;
  }
}
