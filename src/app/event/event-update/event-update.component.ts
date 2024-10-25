import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/person';
import { EventService } from 'src/app/services/event.service';
import { PersonService } from 'src/app/services/person.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Eveniment } from 'src/app/eveniment';
@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  eventForm: FormGroup;
  persons: Person[]; // Assuming a person object structure
  filtredPersons: Person[]; //persons in search result
  selectedPersons: Person [] = []; //persons to be saved
  searchText = new FormControl();
  routeId: string;
  eventToUpdate: Eveniment;
  originalPersonsId: string[];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.eventForm = new FormGroup({
      id: new FormControl(''),
      eventName: new FormControl(''),
      eventDate:new FormControl(''),
      description:new FormControl(''),
      personsId : new FormArray([])
      
    });

  
    this.route.paramMap.subscribe(params =>{this.routeId = params.get('id');}); //primeste href+id
      this.eventService.getEventById(this.routeId).subscribe({
        next: c=>{ this.eventToUpdate = c;

        this.eventForm.patchValue ({
          id: this.eventToUpdate.id,
          eventName: this.eventToUpdate.eventName,
          eventDate: this.eventToUpdate.eventDate,
          description: this.eventToUpdate.description,
          personsId: this.eventToUpdate.personsId
        })},
        error: error=>{console.log(error)},
        complete: ()=>{
          console.log(this.eventToUpdate)
          this.selectedPersons=this.personService.getPersonsByIdArray(this.eventToUpdate.personsId);
        this.originalPersonsId = this.eventToUpdate.personsId}
      })

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

  loadPersonsById(peronsId:string[]):Person[]{
  const persons:Person[] = [];
  peronsId.forEach(personId => {
    this.personService.getPersonById(personId).subscribe((person: Person) => {
      if(person){this.persons.push(person);}
      
    });})
    return persons;
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

    this.eventService.updateEvent(eventData).subscribe({
      next: (value)=>{console.log(value)},
      error: (err)=>{console.log(err)},
      complete:()=>{this.router.navigate(['/eventInfo/',this.eventToUpdate.id])}
    })
  }
}
