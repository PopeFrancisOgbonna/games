import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getGameList(ordering:string,search?:string): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering);
    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}`,{params:params})
  }

  getGameDetails(id:string): Observable<Game>{
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/${id}`);
    const gameTrailerRequest =  this.http.get(`${env.BASE_URL}/${id}/movies`);
    const gameScreenShotRequest = this.http.get(`${env.BASE_URL}/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gameScreenShotRequest
    }).pipe(
      map((resp: any) =>{
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenShotRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results,
        }
      })
    );
  }
}
