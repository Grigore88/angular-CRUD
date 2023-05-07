import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-update-form',
  templateUrl: './company-update-form.component.html',
  styleUrls: ['./company-update-form.component.css']
})
export class CompanyUpdateFormComponent {
  companyForm: FormGroup;
  company: Company;
  id: string;

  constructor(private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(){
      this.companyForm = this.fb.group({
        name: '',
        id:'',
        street: '',
        streetNumber: '',
        city: '',
        postCode: '',
        openHours: '',
        comments: '',
        contacts: this.fb.array([]),
        workers: this.fb.array([])
      });
      
      this.route.paramMap.subscribe(params =>{
        this.id = params.get('id');
        console.log(this.id);
        this.companyService.getCompanyById(this.id).subscribe({
          next: c => {this.company = c
            this.companyForm.patchValue({
              id: this.company.id,
              name: this.company.name,
              street: this.company.street,
              streetNumber: this.company.streetNumber,
              city: this.company.city,
              postCode: this.company.postCode,
              openHours: this.company.openHours,
              comments: this.company.comments,
              //contacts: this.company.contacts,
              //workers: this.company.workers
            });
            this.company.contacts.forEach(contact=>{
              this.contactsFormArray.push(this.fb.control(contact))
            })
            this.company.workers.forEach(worker=>{
              this.workers.push(this.fb.control(worker))
            })
            
                
  
  
  
          },
          error: error=>{console.log(error)},
          complete: ()=>{console.log( this.company)}
           })
           //this.myForm.patchValue(this.person);
          })

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
      const newCompany: Company = this.companyForm.value;
        this.companyService.updateCompany(newCompany).subscribe({
          next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{this.company=null; this.router.navigate(['/companyInfo/',newCompany.id]);}
        })
    }
}
