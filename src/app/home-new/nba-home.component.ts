import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { AppService } from 'app/app-service.service';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-nba-home',
  templateUrl: './nba-home.component.html',
  styleUrls: ['./nba-home.component.css']
})
export class NBAHomeComponent implements OnInit {

    public teamsList: Observable<any>; 
    public teamData: Observable<any>; 
    public teamSelected = 'nba-gs'; 

    baseUrl = 'https://api.stattleship.com/basketball/nba';

  constructor( private appService: AppService, private http: Http) { }


  ngOnInit() {

      // get list of all teams for dropdown
      this.appService.getTeams()
        .subscribe(
          (data) => {
            console.log(data);
            this.teamsList = data.teams;
            console.log('teams data', this.teamsList); 
          },
          (error) => {
                console.log(error); 
          });

          //show default team 
          this.getTeamSelected(); 
    }

    getTeamSelected() {
        console.log('team selected', this.teamSelected);

      // get list of all teams for dropdown
      this.appService.getTeamData(this.teamSelected)
      .subscribe(
        (data) => {
          console.log(data);
          this.teamData = data;
          console.log('teams data', this.teamData); 
        },
        (error) => {
              console.log(error); 
        });

    }
}
