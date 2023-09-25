import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/person';
import { EventService } from 'src/app/services/event.service';
import { PersonService } from 'src/app/services/person.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Relative } from 'src/app/models/relative';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  persons: Person[]; // Assuming a person object structure
  filtredPersons: Person[]; //persons in search result
  selectedPersons: Person [] = []; //persons to be saved
  searchText = new FormControl();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPersons();
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

  initializeForm() {
    this.eventForm = new FormGroup({
      eventName:new FormControl(''),
      eventDate:new FormControl(''),
      description:new FormControl('')
    });
  }

  loadPersons() {
    this.personService.getAllPersons().subscribe({
      next: c =>{this.persons = c},
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{}
    })
  }
  removePersonFromList(personToRemove: Person, personList: Person[]) {
    const indexToRemove = personList.findIndex((person) => person === personToRemove);
  
    if (indexToRemove !== -1) {
      personList.splice(indexToRemove, 1);
    }
  }
  searchPersons(searchText: string) {
    this.filtredPersons = this.persons.filter((person: Person) => {
      // Perform case-insensitive search on relevant fields
      return (
        person.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        person.maidenName?.toLowerCase().includes(searchText.toLowerCase())  )  }
      );
    }
    addPerson(person:Person){
      this.selectedPersons.push(person);
      this.removePersonFromList(person, this.filtredPersons);
      
    }
   removeSelectedPerson(personToRemove:Person){
   this.removePersonFromList(personToRemove, this.selectedPersons)
   }

  onSubmit() {
    const eventData = this.eventForm.value;
    const selctedPersonsId:string[] = this.selectedPersons.map(person => person.id);
    // Attach the selected persons to the event data before saving
   eventData.personsId = selctedPersonsId;

    this.eventService.saveEvent(eventData).subscribe({
      next: (value)=>{console.log(value)},
      error: (err)=>{console.log(err)},
      complete:()=>{this.router.navigate(['/eventPage/'])}
    })
  }
}
