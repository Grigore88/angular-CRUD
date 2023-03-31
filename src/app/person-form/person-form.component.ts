
import { PersonService } from './../services/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup ,FormBuilder,FormArray, FormControl,Validators} from '@angular/forms';
import { Person } from '../person';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {

  myForm: FormGroup;
  constructor(private fb: FormBuilder,private personService: PersonService ) { }
  ngOnInit() {
    this.myForm = new FormGroup({
      //id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(''),
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
  onSubmit() {
    // TODO: subscribe method 
    const person: Person = this.myForm.value;
    this.personService.savePerson(person).subscribe(
      response => {console.log(response);},
      error => console.error(error)
    );
    this.ngOnInit();
  }
}
 


