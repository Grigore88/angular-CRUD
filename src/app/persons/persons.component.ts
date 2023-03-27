import { HttpErrorResponse } from '@angular/common/http';
import { Person } from './../person';
import { Component } from '@angular/core';
import { PersonService } from '../services/person.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent {
  public persons: Person[];
  
  constructor(private personService: PersonService ){}
  ngOnInit(): void {
    this.getPersons();
    console.log("lista: " + this.persons);
  }
  
  public getPersons(): void{
    this.personService.getAllPersons().subscribe(
      (response: Person[])=>{
        this.persons = response;
       },
       (error: HttpErrorResponse)=>{
        alert(error.message)
       }
       )
    }
    public savePerson(person: Person){
      this.personService.savePerson(person)
    }

}
