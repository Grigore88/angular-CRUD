import { Car } from './../car';
import { Address } from './../address';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from './../person';
import { PersonService } from './../services/person.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-person-update-form',
  templateUrl: './person-update-form.component.html',
  styleUrls: ['./person-update-form.component.css']
})
export class PersonUpdateFormComponent {

  myForm: FormGroup;
  person: Person;
  id: string;

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
           // address: this.person.address,
            carsList: this.person.carsList,
            comments: this.person.comments
          });
          
              this.addressForms.removeAt(0);
              this.person.address.forEach(address => {
              this.addressForms.push(this.createAddressFormWithValue(address));});

              this.carsForms.removeAt(0);
              this.person.carsList.forEach(car=>{this.carsForms.push(this.createCarsListwithValue(car))});

              this.phoneForms.removeAt(0);
              this.person.phone.forEach(phone=>{this.phoneForms.push(this.createPhoneWithValue(phone))});



        },
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.person)}
         })
         //this.myForm.patchValue(this.person);
        })

   
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
  onSubmit() {
    const person: Person = this.myForm.value;
    this.personService.updatePerson(person).subscribe({
      next: (value)=>{console.log(value)},
      error: (err)=>{console.log(err)},
      complete:()=>{this.person=null; this.router.navigate(['/personInfo/',person.id]);}
    });
    
  }
}