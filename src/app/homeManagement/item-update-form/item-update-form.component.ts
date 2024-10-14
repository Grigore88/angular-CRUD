import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { Place } from 'src/app/models/place';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-item-update-form',
  templateUrl: './item-update-form.component.html',
  styleUrl: './item-update-form.component.css'
})
export class ItemUpdateFormComponent {
  constructor(private fb: FormBuilder,
    private homeManagementService: HomeManagementService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  itemForm: FormGroup;
  places: Place[];
  selectedPlace: Place;
  itemIdParam: String;
  itemToUpdate: Item;
  
  ngOnInit(){

    this.createItemForm();

    this.route.paramMap.subscribe(params =>{
      this.itemIdParam = params.get('id');
      this.homeManagementService.getItem(this.itemIdParam).subscribe({
        next: c=>{this.itemToUpdate = c;},
        error: error=>{console.log(error)},
        complete: ()=>{
          this.itemForm.patchValue ({
            id: this.itemToUpdate.id,
            itemName: this.itemToUpdate.itemName,
            expireDate: this.itemToUpdate.expireDate,
            place: this.itemToUpdate.place
          })
        }  
   
      });
    })
    this.homeManagementService.getAllPlaces().subscribe({
     next: c=>{this.places = c;},
     error: error=>{console.log(error)},
     complete: ()=>{
        
     }  

    });
    

  }

  createItemForm(){
    this.itemForm = new FormGroup({
      id: new FormControl(''),
      itemName: new FormControl(''),
      place: new FormControl(''),
      description: new FormControl(''),
      expireDate: new FormControl(''),
      barcode: new FormControl('')

    });
  }

     onSubmit(){
      if (this.itemForm.valid){
      const item: Item = this.itemForm.value;
      this.homeManagementService.updateItem(item).subscribe({
        next: (value)=>{console.log(value)},
        error: (err)=>{console.log(err)},
        complete:()=>{this.itemToUpdate=null; this.router.navigate(['/itemPage/'])}
      })
    }

     
     }

}
