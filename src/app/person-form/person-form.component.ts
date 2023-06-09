
import { PersonService } from './../services/person.service';
import { Component } from '@angular/core';
import { FormGroup ,FormBuilder,FormArray, FormControl,Validators} from '@angular/forms';
import { Person } from '../person';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {

  myForm: FormGroup;
  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private router: Router ) { }
  ngOnInit() {
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
      carsList: new FormArray([
        new FormGroup({
          model: new FormControl(),
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
 


