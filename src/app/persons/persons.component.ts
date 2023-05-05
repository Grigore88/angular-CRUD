import { HttpErrorResponse } from '@angular/common/http';
import { Person } from './../person';
import { Component } from '@angular/core';
import { PersonService } from '../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent {
  public persons: Person[];
  monthValue: number;
  searchText: string;
  updatedListTime: string;
  
  constructor(private personService: PersonService ){}
  ngOnInit(): void {
    this.getPersons();
   
  }
  clear(){
    this.persons=null;
  }
  public getPersByMonthOfBirth(){
    if(this.monthValue==null||this.monthValue==undefined){}
    else{
    this.personService.getPersonsByMonthOfBirth(this.monthValue).subscribe({
      next: c => {this.persons = c},
    error: error=>{console.log(error)},
    complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
    })
  }
  }
  public getPersonsBySearchText(){
    if(!this.searchText){}
    else{
      this.personService.getPersonsBySearch(this.searchText).subscribe({
        next: c => {this.persons = c},
    error: error=>{console.log(error)},
    complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
      })
    }
  }
  
  public getPersons(): void{
    this.personService.getAllPersons().subscribe({
      next: c =>{this.persons = c},
      error: error=>{alert(error.message)},
      complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
    })}
    public savePerson(person: Person){
      this.personService.savePerson(person)
    }
   public getUpdatedListTime(){
    return "updated " + this.updatedListTime;
   }
}
