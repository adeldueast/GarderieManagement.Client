import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignalRService } from '../services/http/hub/SignalR.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private signalRService: SignalRService) {

  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
   //   console.log(this.signalRService.connectionId);

      const cloned = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + token)
          // this.signalRService.connectionId is undefined because it wasnt awaited correctly
          .set(
            'x-signalr-connection',
            this.signalRService.connectionId  ?
            this.signalRService.connectionId  :
            ''
          ),
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
