import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

  baseUrl = 'https://api.stattleship.com/basketball/nba';

   headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': '6a01ada5ebb0fe13029b18778cf7e51c',
    'Accept': 'application/vnd.stattleship.com; version=1',
   });
   options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

    /* 
      Get all  teams
      returns all nba teams
    */
    getTeams(): Observable<any> {
      
          return this.http.get(this.baseUrl + '/teams', this.options)
            .map((res) => {
              console.log('teams ', res);
              return res.json();
            })
            .catch(this.handleError);
        }

  /* 
    Get a specific teams roster data 
    params team slug 
    returns team full data with salary 
    */
  getTeamData(teamSlug: string): Observable<any> {

    return this.http.get(this.baseUrl + '/players?team_id=' + teamSlug, this.options)
      .map((res) => {
        console.log('team data from service ', res);
        return res.json();
      })
      .catch(this.handleError);
  }



  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
