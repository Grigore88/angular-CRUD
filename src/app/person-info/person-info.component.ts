import { Person } from 'src/app/person';
import { EventService } from './../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Component } from '@angular/core';
import { Eveniment } from 'src/app/eveniment';
import { Relative } from '../models/relative';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent {

person: Person;
id:string;
eveniments:Eveniment[] = [];
relativePersonMap: Map<string, Person> = new Map();

 constructor(private personService: PersonService,
             private route: ActivatedRoute,
             private eventService:EventService){}

  ngOnInit(){
   
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id')
      
      })
      
    this.personService.getPersonById(this.id).subscribe({
        next: c => { this.person= c;
          
        },
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.person)
          this.loadPersonEvents()
          this.loadPersonsFromRelatives()
          console.log(this.relativePersonMap)
        }
      })
  }
  loadPersonEvents(){
    if(this.person.eventsID){
      this.person.eventsID.forEach(eveniment => {
         this.eventService.getEventById(eveniment).subscribe((newEvent:Eveniment)=>
         {console.log(newEvent);
           this.eveniments.push(newEvent)}
         
     );
       });
       }
       else {
        // Handle the case where c.events is undefined or empty
        console.log('person.events is undefined or empty.');
      }
  }
  loadPersonsFromRelatives(){
    if(this.person.relatives){
      let persIdArray:string[] = [];
      this.person.relatives.forEach(element => {persIdArray.push(element.relativePersonId)});
      //console.log(persIdArray)
      this.relativePersonMap = this.personService.personIdToMap(persIdArray);
      }
   
   
  }

  getFullNameById(personId: string): string | null {
    const person = this.relativePersonMap.get(personId);
  
    if (person) {
      return `${person.firstName} ${person.lastName}`;
    } else {
      return null; // Handle the case where the person is not found
    }
  }
  calculateAge(dateOfBirth: Date, dateOfDeath: Date): number {
    const birth = new Date(dateOfBirth);
    const death = new Date(dateOfDeath);
    const ageInMillis = death.getTime() - birth.getTime();

    // Calculate the age in years
    const ageInYears = Math.floor(ageInMillis / (365 * 24 * 60 * 60 * 1000));

    return ageInYears;
  }
}
