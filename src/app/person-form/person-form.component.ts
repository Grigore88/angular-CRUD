
import { PersonService } from './../services/person.service';
import { Component } from '@angular/core';
import { FormGroup ,FormBuilder,FormArray, FormControl,Validators} from '@angular/forms';
import { Person } from '../person';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Relative } from '../models/relative';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {

  myForm: FormGroup;

  persons: Person[]; // Assuming a person object structure
  personsMap: Map<string, Person> = new Map();
  filtredPersons: Person[]; //persons in search result
  selectedPersons: Person [] = []; //persons to be saved
  searchText = new FormControl();
  relatives: Relative[];

  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private router: Router ) { }
  ngOnInit() {
    this.initializeForm()

    this.loadPersons();
   // 
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
  
  initializeForm(){
    this.myForm = new FormGroup({
      //id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      maidenName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      dateOfDeath: new FormControl(''),
      isAlive: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      phone: new FormArray([
        new FormControl('')
      ]),
      address: new FormArray([
        new FormGroup({
          street: new FormControl(''),
          postCode: new FormControl(''),
          city: new FormControl(''),
          country: new FormControl('')
        })
      ]),
      relatives: new FormArray([
        //new FormGroup({
          //relativePersonId: new FormControl(''),
         //relativeType: new FormControl('')
       // })
      ]),
      carsList: new FormArray([
        new FormGroup({
          model: new FormControl(''),
          plateNumber: new FormControl('')
        })
      ]),
      comments: new FormControl('')
    });
  }

  get phoneForms() {
    return this.myForm.get('phone') as FormArray;
  }

  addPhone() {
    const phone = new FormControl('');
    this.phoneForms.push(phone);
  }

  deletePhone(i:number) {
    this.phoneForms.removeAt(i);
  }

  get addressForms() {
    return this.myForm.get('address') as FormArray;
  }

  addAddress() {
    const address = new FormGroup({
      street: new FormControl(''),
      postCode: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    });
    this.addressForms.push(address);
  }

  deleteAddress(i:number) {
    this.addressForms.removeAt(i);
  }

  get carsForms() {
    return this.myForm.get('carsList') as FormArray;
  }

  get relativesForm() {
    return this.myForm.get('relatives') as FormArray;
  }

  addRelative(person:Person) {
    const personId = person.id;
    const relative = new FormGroup({
      relativePersonId: new FormControl(personId),
      relativeType: new FormControl('')
    });
    this.relativesForm.push(relative);
  }

  deleteRelative(i:number) {
    this.relativesForm.removeAt(i);
  }
  
  getPersonByRelativeObject(relative:Relative):string{
    let newPerson:Person;
    this.personService.getPersonById(relative.relativePersonId).subscribe(
      {next: person=>{newPerson=person
      console.log(person)},
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{}
    },
      )
   return newPerson.firstName + newPerson.lastName;
  }
  

  addCar() {
    const car = new FormGroup({
      model: new FormControl(''),
      plateNumber: new FormControl('')
    });
    this.carsForms.push(car);
  }

  deleteCar(i:number) {
    this.carsForms.removeAt(i);
  }
  savePerson(person: Person){
    this.personService.savePerson(person).subscribe({
      next: (value)=>{person = value},
      error: (err)=>{console.log(err)},
      complete:()=>{this.router.navigate(['/personInfo/', person.id])}}//shows created person page
      // response => {console.log(response);},
      // error => console.error(error)
    );
  }

  loadPersons() {
    this.personService.getAllPersons().subscribe({
      next: c =>{this.persons = c},
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{this.personsMap = this.personService.getAllPersonsMap(this.persons);}
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
      this.addRelative(person)
      
    }
   removeSelectedPerson(personToRemove:Person){
   this.removePersonFromList(personToRemove, this.selectedPersons)
   }
   getFullNameById(personId: string): string | null {
    const person = this.personsMap.get(personId);
  
    if (person) {
      return `${person.firstName} ${person.lastName}`;
    } else {
      return null; // Handle the case where the person is not found
    }
  }

  onSubmit() {
    const createdPerson: Person = this.myForm.value;
    
    this.personService.isPersonByFirstNameAndLastName(createdPerson.firstName, createdPerson.lastName).subscribe({
      next: (value)=>{if(value){ 
        const confirmation = window.confirm('Already exists. Are you sure you want to save this person?');
        if (confirmation){
          this.savePerson(createdPerson);
        }
        else{}
      }
       else {
        // Save the person directly
        this.savePerson(createdPerson);
      }
       }
      })
    
    this.ngOnInit();
  }
}
 


