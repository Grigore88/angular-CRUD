import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent {

  locationForm: FormGroup;

  constructor(private fb: FormBuilder, private hmMangementServiece: HomeManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      //places: this.fb.array([]) // Initialize as a form array for multiple places
    });
  }

  get places(): FormArray {
    return this.locationForm.get('places') as FormArray;
  }

  addPlace(): void {
    this.places.push(this.fb.group({
      name: ['', Validators.required],
      description: ['']
    }));
  }

  removePlace(index: number): void {
    this.places.removeAt(index);
  }

  submitForm(): void {
    if (this.locationForm.valid) {
      const location: Location = this.locationForm.value;
      console.log('Location data: ', location);
      this.hmMangementServiece.createLocation(location).subscribe({
        next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{ this.router.navigate(['/itemPage/'])}
      })
    } else {
      console.log('Form is invalid');
    }
  }


}
