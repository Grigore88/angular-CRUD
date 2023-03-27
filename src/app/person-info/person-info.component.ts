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
      console.log(this.id);
      this.personService.getPersonById(this.id).subscribe({
        next: c => { this.person= c
        },
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.person)}
    
  })})

}
}
