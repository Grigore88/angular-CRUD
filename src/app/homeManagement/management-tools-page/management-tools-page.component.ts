import { Component } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Place } from 'src/app/models/place';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-management-tools-page',
  //standalone: true,
  //imports: [],
  templateUrl: './management-tools-page.component.html',
  styleUrl: './management-tools-page.component.css'
})
export class ManagementToolsPageComponent {

  constructor (private hmService: HomeManagementService){}

  locations: Location[];
  places: Place[];

  ngOnInit(): void {
    this.hmService.getAllLocations().subscribe({
      next: c=>{this.locations = c;},
      error: error=>{console.log(error)},
      complete: ()=>{console.log( )}  
 
    });

    this.hmService.getAllPlaces().subscribe({
      next: c=>{this.places = c;},
      error: error=>{console.log(error)},
      complete: ()=>{console.log( )}  
 
    });
    
  }


  deleteLocation(locationId: String){
    const confirmation = window.confirm('Are you sure?');
  if (confirmation){
    this.hmService.deleteLocation(locationId).subscribe({
      next: c => {console.log(c)},
      error: error=>{console.log(error)},
      complete: ()=>{this.ngOnInit()}
    });
    console.log("deleting location" + locationId)
  }
  else{}


  }
  deletePlace(placeId: String){
    const confirmation = window.confirm('Are you sure?');
    if (confirmation){
      this.hmService.deletePlace(placeId).subscribe({
        next: c => {console.log(c)},
        error: error=>{console.log(error)},
        complete: ()=>{this.ngOnInit()}
      });
      console.log("deleting place" + placeId)
    }
    else{}
  
  }
}
