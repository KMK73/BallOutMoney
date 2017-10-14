import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { AppService } from 'app/app-service.service';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';

// for searching position pipe 
import { PositionPipe } from './position.pipe';
import { NamePipe } from './name.pipe';
import { OrderByPipe } from './orderBy.pipe';

@Component({
  selector: 'app-nba-home',
  templateUrl: './nba-home.component.html',
  styleUrls: ['./nba-home.component.scss'],
})
export class NBAHomeComponent implements OnInit {

    public teamsList: Observable<any>; 
    public teamData: Observable<any>; 
    public teamSeasonData: Observable<any>; 
    public teamSelected = 'nba-gs'; 
    teamSalary: number; 

    baseUrl = 'https://api.stattleship.com/basketball/nba';
    isDesc: boolean = true;
    column: string = 'name';
    direction: number;
  
    chartOptions = {
      responsive: true
    };
  
    chartData = [
      { data: [330, 600, 260, 700], label: 'Account A' },
      { data: [120, 455, 100, 340], label: 'Account B' },
      { data: [45, 67, 800, 500], label: 'Account C' }
    ];
  
    chartLabels = ['January', 'February', 'Mars', 'April'];
  
    onChartClick(event) {
      console.log(event);
    }

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
          this.teamSalary = this.calculateTotalTeamSalary(this.teamData);
          console.log('teams data', this.teamData); 
        },
        (error) => {
              console.log(error); 
        });

        // get team selected roster data 
      this.appService.getTeamSeasonData(this.teamSelected)
      .subscribe(
        (data) => {
          console.log(data);
          this.teamSeasonData = data;
          console.log('teams data', this.teamSeasonData); 
        },
        (error) => {
              console.log(error); 
        });

    }

    // sort the columens of the table 
    sort(property) {
      console.log('property', property); 
      this.isDesc = !this.isDesc; //change the direction
      this.column = property;
      console.log('column', this.column); 
      this.direction = this.isDesc ? 1 : -1;
    };

    generateArray(obj){
      console.log(obj); 
      let result = Object.keys(obj).map((key)=>{ return obj[key]}); 
      console.log('result', result);
      return result ;
    }

    calculateTotalTeamSalary(teamData) {
      let totalSalary = 0; 

      teamData.players.forEach(player => {
              console.log(player);
              totalSalary += player.salary;
      });
      return totalSalary;
    }


    public calculateTeamAvgPoints(obj) {

      // obj = this.generateArray(obj);
      console.log('obj inside calc', obj); 
      debugger; 
      let teamSeasonData = obj;
      let totalAvgPoints = 0; 

      teamSeasonData.team_season_stats.forEach(item => {
              console.log(item);
              totalAvgPoints += item.average_points;
      });

      let avgPoints = totalAvgPoints / teamSeasonData.team_season_stats.length; 
      console.log('avg points result', avgPoints); 
      alert(avgPoints);
    }

    // get salary for each player dataset 1

    // get points per game each player dataset 2 

    //legend x - player name 
}
