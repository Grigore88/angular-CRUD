import { Router } from '@angular/router';

import { Person } from './../person';
import { Component } from '@angular/core';
import { PersonService } from '../services/person.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent {
  public persons: Person[];
  public filtredPersons: Person[];
  monthValue: number;
  searchText = new FormControl();
  updatedListTime: string;
  
  constructor(private personService: PersonService, private router:Router){}
  ngOnInit(): void {
   // if(!sessionStorage.getItem('username')){
  // this.router.navigateByUrl('/login')}
    //else{}
    this.getPersons();
    this.searchText.valueChanges
    .pipe(
      debounceTime(300), // Add a delay before triggering the search
      distinctUntilChanged() // Trigger the search only if the search term changes
    )
    .subscribe((searchText: string) => {
      // Call a method to perform the search based on the searchValue
      this.searchPersons(searchText);
    });
   }
  
  clear(){
    this.persons=null;
  }

  searchPersons(searchText: string) {
    this.filtredPersons = this.persons.filter((person: Person) => {
      // Perform case-insensitive search on relevant fields
      return (
        person.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.maidenName?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.dateOfBirth?.toString().toLowerCase().includes(searchText.toLocaleLowerCase())||
        person.dateOfDeath?.toString().toLowerCase().includes(searchText.toLocaleLowerCase())||
        person.email?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())||
        person.gender?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())||
        person.age?.toString().includes(searchText.toLowerCase()) ||
        person.zodiac?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.comments?.toLowerCase().includes(searchText.toLowerCase()) ||
        (person.phone && person.phone.some(contact =>
          contact.replace(/\s/g,'').toLowerCase().includes(searchText.toLowerCase())))||
          (person.carsList && person.carsList.some(car =>
            car.model?.toLowerCase().includes(searchText.toLowerCase()) || // Search car model
            car.plateNumber?.toLowerCase().includes(searchText.toLowerCase()) // Search car plate number
          ))) ||
          (person.address && person.address.some(address =>
            address.street?.toLowerCase().includes(searchText.toLowerCase()) || // Search street
            address.postCode?.toLowerCase().includes(searchText.toLowerCase()) || // Search postal code
            address.city?.toLowerCase().includes(searchText.toLowerCase()) || // Search city
            address.country?.toLowerCase().includes(searchText.toLowerCase()) // Search country
          )) }
      );
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
  /*public getPersonsBySearchText(){
    if(!this.searchText){}
    else{
      this.personService.getPersonsBySearch(this.searchText).subscribe({
        next: c => {this.persons = c},
    error: error=>{console.log(error)},
    complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
      })
    }
  }*/
  
  public getPersons(): void{
    this.personService.getAllPersons().subscribe({
      next: c =>{this.persons = c},
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
    })}
    public savePerson(person: Person){
      this.personService.savePerson(person)
    }
   public getUpdatedListTime(){
    return "updated " + this.updatedListTime;
   }
}
