import { Car } from './../car';
import { Address } from './../address';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from './../person';
import { PersonService } from './../services/person.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Relative } from '../models/relative';
@Component({
  selector: 'app-person-update-form',
  templateUrl: './person-update-form.component.html',
  styleUrls: ['./person-update-form.component.css']
})
export class PersonUpdateFormComponent {

  myForm: FormGroup;
  person: Person;
  id: string;
  persons: Person[]; // Assuming a person object structure
  personsMap: Map<string, Person> = new Map();
  filtredPersons: Person[]; //persons in search result
  selectedPersons: Person [] = []; //persons to be saved
  searchText = new FormControl();
  relatives: Relative[];

  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  
    this.myForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      maidenName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      dateOfDeath: new FormControl(''),
      isAlive: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      phone: new FormArray([
        //new FormControl('')
      ]),
        address: new FormArray([
        //new FormGroup({
      //  street: new FormControl(''),
      //  postCode: new FormControl(''),
       // city: new FormControl(''),
       // country: new FormControl('')
       //})
      ]),
      relatives: new FormArray([
        //new FormGroup({
          //relativePersonId: new FormControl(''),
         //relativeType: new FormControl('')
       // })
      ]),
      carsList: new FormArray([
        //new FormGroup({
         // model: new FormControl(''),
         // plateNumber: new FormControl('')
       // })
      ]),
      comments: new FormControl('')
    });
    this.route.paramMap.subscribe(params =>{
      this.id = params.get('id');
      console.log(this.id);
      this.personService.getPersonById(this.id).subscribe({
        next: c => {this.person = c
          this.myForm.patchValue({
            id: this.person.id,
            firstName: this.person.firstName,
            lastName: this.person.lastName,
            maidenName: this.person.maidenName,
            dateOfBirth: this.person.dateOfBirth,
            dateOfDeath: this.person.dateOfDeath,
            isAlive: this.person.isAlive,
            email: this.person.email,
            gender: this.person.gender,
            phone: this.person.phone,
            relatives: this.relatives,
            address: this.person.address,
            carsList: this.person.carsList,
            comments: this.person.comments
          });
          
             // this.addressForms.removeAt(0);
              this.person.address.forEach(address => {
              this.addressForms.push(this.createAddressFormWithValue(address));});

             // this.carsForms.removeAt(0);
              this.person.carsList.forEach(car=>{this.carsForms.push(this.createCarsListwithValue(car))});

              //this.phoneForms.removeAt(0);
              this.person.phone.forEach(phone=>{this.phoneForms.push(this.createPhoneWithValue(phone))});
              this.person.relatives.forEach(relative => {this.relativesForm.push(this.createRelativeWithValue(relative))});


        },
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.person)}
         })
         //this.myForm.patchValue(this.person);
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
  //---------
  createAddressFormWithValue(address: Address): FormGroup {
    return this.fb.group({
      street: [address.street],
      postCode: [address.postCode],
      city: [address.city],
      country: [address.country]
    });
  }
  createCarsListwithValue(car: Car): FormGroup {
    return this.fb.group({
      model: [car.model],
      plateNumber: [car.plateNumber]
    })
  }
  createPhoneWithValue(phone: string): FormControl{
    return this.fb.control(phone)
  }
  createRelativeWithValue(relative: Relative){
    return this.fb.group({
      relativePersonId: [relative.relativePersonId],
      relativeType: [relative.relativeType]
    })
  }


  //---------

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

  addAddress(addres?: Address) {
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
  

  loadPersons() {
    this.personService.getAllPersons().subscribe({
      next: c =>{this.persons = c},
      error: error=>{alert('serverul nu raspunde')},
      complete: ()=>{ this.personsMap = this.personService.getAllPersonsMap(this.persons);}
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
    const person: Person = this.myForm.value;
    this.personService.updatePerson(person).subscribe({
      next: (value)=>{console.log(value)},
      error: (err)=>{console.log(err)},
      complete:()=>{this.person=null; this.router.navigate(['/personInfo/',person.id]);}
    });
    
  }
}