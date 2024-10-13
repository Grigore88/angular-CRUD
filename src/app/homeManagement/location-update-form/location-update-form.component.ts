import { HomeManagementService } from 'src/app/services/home-management.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { Place } from 'src/app/models/place';


@Component({
  selector: 'app-location-update-form',
  templateUrl: './location-update-form.component.html',
  styleUrl: './location-update-form.component.css'
})
export class LocationUpdateFormComponent {

  locationForm: FormGroup;
  locationToUpdate: Location;
  places: Place[];
  locationIdParam: String;

  constructor(private fb: FormBuilder,
    private hmManagementService: HomeManagementService ,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.locationIdParam = params.get('id');
      this.hmManagementService.getLocation(this.locationIdParam).subscribe({
        next: c=>{this.locationToUpdate= c;},
        error: error=>{console.log(error)},
        complete: ()=>{console.log( )}  
   
      });
    })
    
    this.locationForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      place: new FormControl(''),
      description: new FormControl('')
   });

   this.hmManagementService.getAllPlaces().subscribe({
    next: c=>{this.places = c;
     this.locationForm.patchValue ({
       id: this.locationToUpdate.id,
       name: this.locationToUpdate.name,
       place: this.locationToUpdate.places
     })
    },
    error: error=>{console.log(error)},
    complete: ()=>{console.log( )}  

   });

   

  }




  submitForm(): void {
    if (this.locationForm.valid) {
      const location: Location = this.locationForm.value;
      console.log('Location data: ', location);
      this.hmManagementService.updateLocation(location).subscribe({
        next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{ this.router.navigate(['/itemPage/'])}
      })
    } else {
      console.log('Form is invalid');
    }
  }

}
