import { Place } from 'src/app/models/place';
import { HomeManagementService } from './../../services/home-management.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';


@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrl: './place-form.component.css'
})
export class PlaceFormComponent {

  placeForm: FormGroup;
  locations: Location[];
  selectedLocation: Location;

  constructor(private fb: FormBuilder,
    private homeManagementService: HomeManagementService,
    private router: Router){}

  ngOnInit(){
     this.homeManagementService.getAllLocations().subscribe({
      next: c=>{this.locations = c;},
      error: error=>{console.log(error)},
      complete: ()=>{console.log( )}  

     });
      this.placeForm = new FormGroup({
        placeName: new FormControl(''),
        description: new FormControl(''),
       location: new FormControl(''),
      //  items: new FormArray([
       //   new FormGroup([
      //      id: new FormControl(''),
      //      itemName: new FormControl(''),
       //     place: new FormControl(''),
       //     expireDate?: new FormControl(''),
       //     barcode?: new FormControl('')
       //   ])
      //  ]),
        barcode: new FormControl('')

      });}

      onSubmit() {
        if (this.placeForm.valid) {
        const place: Place = this.placeForm.value;
        this.homeManagementService.createPlace(place).subscribe({
          next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{ this.router.navigate(['/itemPage/'])}
        })
                                   }
      }

}
