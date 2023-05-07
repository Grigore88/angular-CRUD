import { Router } from '@angular/router';
import { Company } from './../../Company';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
 

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      street: '',
      streetNumber: '',
      city: '',
      postCode: '',
      openHours: '',
      comments: '',
      contacts: this.fb.array(['']),
      workers: this.fb.array([''])
    });
  }

  get contactsFormArray() {
    return this.companyForm.get('contacts') as FormArray;
  }
  get workers() {
    return this.companyForm.get('workers') as FormArray;
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
      next: (value)=>{createdCompany = value},
      error: (err)=>{console.log(err)},
      complete:()=>{this.router.navigate(['/companyInfo/', createdCompany.id])
      }
    }

    )
    
  }
}
