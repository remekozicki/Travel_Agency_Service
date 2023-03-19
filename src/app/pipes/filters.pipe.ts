import { Pipe, PipeTransform } from '@angular/core';
import { Trips } from '../../models/model';

@Pipe({
  name: 'filter'
})
export class FiltersPipe implements PipeTransform {

  transform(tripsList: Array<Trips>, search:string[]): any {
    console.log(tripsList,search)
    if(search.length > 0){
      if(search[0] !== '' && search[0] !=='wszystkie'){
        tripsList = tripsList.filter((d)=> d.destiny.indexOf(search[0])>-1)
      }
      if(search[3] !== '0'){
        tripsList = tripsList.filter((d) => {
          return d.pricePerPerson >= parseInt(search[3])
        })
      }

      if(search[4] !== '0'){
        tripsList = tripsList.filter((d) => {
          return d.pricePerPerson <= parseInt(search[4])
        })
      }

      if(search[5] !== '0'){
        tripsList = tripsList.filter((d) => {
          return d.rating >= parseInt(search[5])
        })
      }

      if(search[1] !== ''){
        tripsList = tripsList.filter((d) => {
          let date1 : Date = new Date (search[1])
          let date2 : Date  = new Date (d.startDate)
          return date2.getTime() >= date1.getTime() 
        })
      }

      if(search[2] !== ''){
        tripsList = tripsList.filter((d) => {
          let date1 : Date = new Date (search[2])
          let date2 : Date  = new Date (d.startDate)
          return date2.getTime() <= date1.getTime() 
        })
      }
    }
    return tripsList

    

  }
}
