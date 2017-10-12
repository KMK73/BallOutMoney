/* 
create a pipe to search the result by player name 
because filter is not available as it was in angularjs any more.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {

    /*
        Here in transform method we are accepting the list of positions and search text to search/filter record on the list. 
        Import this file into our nba-home.component.ts file to access this function
    */
    transform(names: any, searchName: any): any {
      //if no match return whole list
      if(searchName == null) return names;
  
      return names.filter(function(name){
        return name.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1;
      })
    }
  }