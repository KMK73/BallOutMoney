import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppService {

  baseUrl = 'https://api.stattleship.com/basketball/nba';


  constructor(private http: Http) { }

  getTeamData(): Observable<any> {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': '6a01ada5ebb0fe13029b18778cf7e51c',
      'Accept': 'application/vnd.stattleship.com; version=1',
     });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl + '/players?team_id=nba-gs', options)
      .map((res) => {
        console.log('service ', res);
        return res.json().body; // using return res.json() will throw error
      })
      .catch(this.handleError);
  }

  // private extractData(res: Response){
  //   const body = res.json();
  //   return body.data || {};
  // }

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
