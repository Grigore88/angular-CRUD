
import { Router } from '@angular/router';
import { Company } from './../../Company';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  companyForm: FormGroup;
 

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
     this.companyForm = new FormGroup({
      name: new FormControl(''),
      street: new FormControl(''),
      streetNumber: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(''),
      openHours: new FormControl(''),
      comments: new FormControl(''),
      deliveryPoint: new FormArray([
        new FormGroup({
          name: new FormControl(''),
          latitude: new FormControl(''),
          longitude: new FormControl('')
        })
    ]),
      contacts: this.fb.array(['']),
      workers: this.fb.array([''])
    });
  }

  get deliveryPointForm(){
    return this.companyForm.get('deliveryPoint') as FormArray;
  }
  get contactsFormArray() {
    return this.companyForm.get('contacts') as FormArray;
  }
  get workers() {
    return this.companyForm.get('workers') as FormArray;
  }
  addPoint() {
    const point = new FormGroup({
      name: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl('')
    });
    this.deliveryPointForm.push(point);
    }
  deletePoint(index:number){
    this.deliveryPointForm.removeAt(index);
  }  
  addContact() {
    this.contactsFormArray.push(this.fb.control(''));
  }

  removeContact(index: number) {
    this.contactsFormArray.removeAt(index);
  }

  addWorker() {
    this.workers.push(this.fb.control(''));
  }
  
  removeWorker(index: number) {
    this.workers.removeAt(index);
  }
  onSubmit(){
    const company: Company = this.companyForm.value;
    let createdCompany: Company;
    this.companyService.saveCompany(company).subscribe({
      next: (value)=>{
        createdCompany = value;
        this.companyService.refreshLocalStorage();},
      error: (err)=>{console.log(err)},
      complete:()=>{
        this.router.navigate(['/companyInfo/', createdCompany.id])
        
      }
    }

    )
    
  }
}
