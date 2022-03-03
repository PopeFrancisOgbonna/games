import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
  
  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({
      setHeaders:{
        'x-rapidapi-key':'a5ecd8e9f6mshc7562146c47b4d1p17e8dejsn2a9989f3b8fb',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
      },
      
    });
    return next.handle(req);
  }
}