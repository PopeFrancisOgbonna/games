import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!:string;
  game!: Game;
  routeSubscription!: Subscription;
  gameSubscritption!: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) =>{
      this.gameId = params["id"];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id:string): void{
    this.gameSubscritption = this.httpService.getGameDetails(id).subscribe((gameRes: Game) =>{
      this.game = gameRes;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    })
  }

  getColor(value:number): string{
    if(value > 75){
      return '#5ee432';
    }else if(value > 50){
      return '#fffa50';
    }else if(value > 30){
      return '#f7aa38';
    }else{
      return '#ef4655';
    }
  }

  ngOnDestroy(): void{
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
    if(this.gameSubscritption){
      this.gameSubscritption.unsubscribe();
    }
  }
}
