import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private key='f892e95f7ff54706b7c2cdfa5702cb0a'
  constructor(private http:HttpClient) { }

  getGameList(ordering:string,search?:string): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering);
    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}?key=${this.key}`,{params:params})
  }

  getGameDetails(id:string): Observable<Game>{
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/${id}?key=${this.key}`);
    const gameTrailerRequest =  this.http.get(`${env.BASE_URL}/${id}/movies?key=${this.key}`);
    const gameScreenShotRequest = this.http.get(`${env.BASE_URL}/${id}/screenshots?key=${this.key}`);

    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gameScreenShotRequest
      
      
    }).pipe(
      map((resp: any) =>{
        console.log(resp);
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenShotRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results,
        }
      })
    );
  }
}
