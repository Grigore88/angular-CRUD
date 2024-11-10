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
  monthValue: number | null;
  //searchText = new FormControl();
  public searchText: string = '';     // Variable to hold the search input
  updatedListTime: string;
  today: Date = new Date();
  
  constructor(private personService: PersonService, private router:Router){}
  ngOnInit(): void {
   // if(!sessionStorage.getItem('username')){
  // this.router.navigateByUrl('/login')}
    //else{}

  this.getPersByMonthOfBirth(this.today.getMonth() + 1);
    
   
   }
  
  clear(){
    this.persons=null;
  }

   // Filter items based on search text
   filterPersons(): void {
    const lowerSearchText = this.searchText.toLowerCase();
    this.filtredPersons = this.persons.filter(person => {
      return (
        person.firstName?.toLowerCase().includes(lowerSearchText) ||
        person.lastName?.toLowerCase().includes(lowerSearchText) ||
        person.maidenName?.toLowerCase().includes(lowerSearchText) ||
        person.dateOfBirth?.toString().toLowerCase().includes(lowerSearchText)||
        person.dateOfDeath?.toString().toLowerCase().includes(lowerSearchText)||
        person.email?.toLocaleLowerCase().includes(lowerSearchText)||
        person.gender?.toLocaleLowerCase().includes(lowerSearchText)||
        person.age?.toString().includes(lowerSearchText) ||
        person.zodiac?.toLowerCase().includes(lowerSearchText) ||
        person.comments?.toLowerCase().includes(lowerSearchText) ||
        (person.phone && person.phone.some(contact =>
          contact.replace(/\s/g,'').toLowerCase().includes(lowerSearchText)))||
          (person.carsList && person.carsList.some(car =>
            car.model?.toLowerCase().includes(lowerSearchText) || // Search car model
            car.plateNumber?.toLowerCase().includes(lowerSearchText) // Search car plate number
          ))) ||
          (person.address && person.address.some(address =>
            address.street?.toLowerCase().includes(lowerSearchText) || // Search street
            address.postCode?.toLowerCase().includes(lowerSearchText) || // Search postal code
            address.city?.toLowerCase().includes(lowerSearchText) || // Search city
            address.country?.toLowerCase().includes(lowerSearchText) // Search country
          )) 
    });
  }

  /* searchPersons(searchText: string) {
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
    } */
  

  public getPersByMonthOfBirth(month : number){
    this.personService.getPersonsByMonthOfBirth(month).subscribe({
      next: c => {
        this.persons = c;
        this.filtredPersons = c;
      },
    error: error=>{console.log(error)},
    complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
    })
  
  }
  
  
  public getPersons(): void{
    this.personService.getAllPersons().subscribe({
      next: c =>{
        this.persons = c;
        this.filtredPersons =c;
      },
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
    })}
    public savePerson(person: Person){
      this.personService.savePerson(person)
    }
   public getUpdatedListTime(){
    return "updated " + this.updatedListTime;
   }
   deletePeroson(id: string){
    const confirmation = window.confirm('Are you sure?');
        if (confirmation){
          this.personService.deletePerson(id).subscribe({
            next: c => {console.log(c)},
            error: error=>{console.log(error)},
            complete: ()=>{this.ngOnInit()}
          });
          console.log("deleting in main page" + id)
        }
        else{}

   }

   // Method to check if the person's birthday is today
  isBirthdayToday(dateOfBirth: Date): boolean {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    return (
      today.getDate() === birthDate.getDate() &&
      today.getMonth() === birthDate.getMonth()
    );
  }

}
