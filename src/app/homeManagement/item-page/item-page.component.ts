import { Item } from 'src/app/models/item';
import { HomeManagementService } from './../../services/home-management.service';
import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent {

  constructor (private hmService: HomeManagementService){}
  
  public items: Item[];

  ngOnInit(): void {
    this.hmService.getAllItems().subscribe({
      next: c=>{this.items = c;},
      error: error=>{console.log(error)},
      complete: ()=>{console.log( )}  
 
    });
    
  }

  // Sort by expiration date
  sortByExpireDate(): void {
    this.items.sort((a, b) => (a.expireDate?.getTime() || 0) - (b.expireDate?.getTime() || 0));
  }

  // Sort by place name
  sortByPlace(): void {
    this.items.sort((a, b) => {
      if (a.place && b.place) {
        return a.place.placeName.localeCompare(b.place.placeName);
      }
      return 0;
    });
  }

  deleteItem(itemId: String){
    const confirmation = window.confirm('Are you sure?');
  if (confirmation){
    this.hmService.deleteItem(itemId).subscribe({
      next: c => {console.log(c)},
      error: error=>{console.log(error)},
      complete: ()=>{this.ngOnInit()}
    });
    console.log("deleting item" + itemId)
  }
  else{}

  }

}
