import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { Place } from 'src/app/models/place';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  constructor(private fb: FormBuilder,
    private homeManagementService: HomeManagementService,
    private router: Router){}

  itemForm: FormGroup;
  places: Place[];
  selectedPlace: Place;
  
  ngOnInit(){
    this.homeManagementService.getAllPlaces().subscribe({
     next: c=>{this.places = c;},
     error: error=>{console.log(error)},
     complete: ()=>{console.log( )}  

    });
     this.itemForm = new FormGroup({
       itemName: new FormControl(''),
       place: new FormControl(''),
       description: new FormControl(''),
       expireDate: new FormControl(''),
       barcode: new FormControl('')

     });}

     onSubmit(){
      if (this.itemForm.valid) {
        const item: Item = this.itemForm.value;
        this.homeManagementService.createItem(item).subscribe({
          next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{ this.router.navigate(['/itemPage/'])}
        })
                                   }
     }
}
