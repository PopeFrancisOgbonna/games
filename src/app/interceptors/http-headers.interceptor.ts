import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
  
  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({
      setHeaders:{
        'X-RapidAPI-Key': 'b3b85928ffmsh6c3d640f8dad07ep16542bjsnea9bd86ddc52',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
      },
      
    });
    return next.handle(req);
  }
}