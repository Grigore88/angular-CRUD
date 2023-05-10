import { Person } from './../person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from './../services/person.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent {

person: Person;
id:string;

 constructor(private personService: PersonService,
  private route: ActivatedRoute){}

  ngOnInit(){
   
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id');
      this.personService.getPersonById(this.id).subscribe({
        next: c => { this.person= c},
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.person)}
    
    })})
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
