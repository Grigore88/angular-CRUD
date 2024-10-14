import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { Place } from 'src/app/models/place';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-place-update-form',
  templateUrl: './place-update-form.component.html',
  styleUrl: './place-update-form.component.css'
})
export class PlaceUpdateFormComponent {

  placeForm: FormGroup;
  placeToUpdate: Place;
  locations : Location[];
  placeIdParam: String;

  constructor(private fb: FormBuilder,
    private hmManagementService: HomeManagementService ,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.placeForm = new FormGroup({
      id: new FormControl(''),
      placeName: new FormControl(''),
      description: new FormControl(''),
       location: new FormControl(''),
        barcode: new FormControl('')
   });

    this.route.paramMap.subscribe(params =>{
      this.placeIdParam = params.get('id');
      this.hmManagementService.getPlace(this.placeIdParam).subscribe({
        next: c=>{this.placeToUpdate= c;},
        error: error=>{console.log(error)},
        complete: ()=>{
          console.log('get object from paramID' + this.placeToUpdate);
          this.hmManagementService.getAllLocations().subscribe({
            next: c=>{this.locations = c;},
            error: error=>{console.log(error)},
            complete: ()=>{
              this.placeForm.patchValue ({
                id: this.placeToUpdate.id,
                placeName: this.placeToUpdate.placeName,
                description: this.placeToUpdate.description,
                location: this.placeToUpdate.location
              })
            }  
          });

        }  
   
      });
    })
   

  

   

  }

  
  onSubmit() {
    if (this.placeForm.valid) {
    const place: Place = this.placeForm.value;
    this.hmManagementService.updatePlace(place).subscribe({
      next: (value)=>{console.log(value)},
      error: (err)=>{console.log(err)},
      complete:()=>{ this.router.navigate(['/itemPage/'])}
    })
                               }
  }


}
