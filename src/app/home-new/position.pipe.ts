/* 
create a pipe to search the result by player position 
because filter is not available as it was in angularjs any more.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'position' })
export class PositionPipe implements PipeTransform {

    /*
        Here in transform method we are accepting the list of positions and search text to search/filter record on the list. 
        Import this file into our nba-home.component.ts file to access this function
    */
    transform(positions: any, searchText: any): any {
      if(searchText == null) return positions;
  
      return positions.filter(function(position){
        return position.position_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      })
    }
  }