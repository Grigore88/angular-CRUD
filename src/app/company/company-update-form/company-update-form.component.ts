import { DeliveryPoint } from 'src/app/DeliveryPoint';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/services/company.service';
import { waitForAsync } from '@angular/core/testing';

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
      this.companyForm = new FormGroup({
        id: new FormControl(''),
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
        contacts: new FormArray([
          new FormControl('')
        ]),
        workers: new FormArray([
          new FormControl('')
        ])
      });
      
      this.route.paramMap.subscribe(params =>{
        this.id = params.get('id');
        console.log(this.id);
        this.companyService.getCompanyById(this.id).subscribe({
          next: c => {this.company = c;
            
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
            this.contactsFormArray.removeAt(0);
            this.company.contacts.forEach(contact=>{
              this.contactsFormArray.push(this.fb.control(contact))
            })
            this.workers.removeAt(0);
            this.company.workers.forEach(worker=>{
              this.workers.push(this.fb.control(worker))
            })
            if (c.deliveryPoint){this.deliveryPointForm.removeAt(0);}
            
            this.company.deliveryPoint.forEach(deliveryPoint=>{
              this.deliveryPointForm.push(this.createPointFormWithValue(deliveryPoint));
            })
                
  
  
  
          },
          error: error=>{console.log(error)},
          complete: ()=>{console.log( this.company)}
           })
           //this.myForm.patchValue(this.person);
          })

    }

    createPointFormWithValue(point: DeliveryPoint): FormGroup {
      return this.fb.group({
        name: [point.name],
        latitude: [point.latitude],
        longitude: [point.longitude]
      });
    }

    get contactsFormArray() {
      return this.companyForm.get('contacts') as FormArray;
    }
    get workers() {
      return this.companyForm.get('workers') as FormArray;
    }
    get deliveryPointForm(){
      return this.companyForm.get('deliveryPoint') as FormArray;
    }
  
    addContact() {
      this.contactsFormArray.push(this.fb.control(''));
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
          next: (value)=>{
            console.log(value);
            this.companyService.refreshLocalStorage();
          },
          error: (err)=>{console.log(err)},
          complete:()=>{
            this.company=null; 
            
            this.router.navigate(['/companyInfo/',newCompany.id]);
            }
        })
    }
}
