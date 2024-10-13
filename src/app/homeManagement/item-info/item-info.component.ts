import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { HomeManagementService } from 'src/app/services/home-management.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.css'
})
export class ItemInfoComponent {

  constructor(
    private homeManagementService: HomeManagementService,
    private route: ActivatedRoute,
    private router: Router){}

  item: Item;
  itemIdParam: String;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.itemIdParam = params.get('id');
      this.homeManagementService.getItem(this.itemIdParam).subscribe({
        next: c=>{this.item = c;},
        error: error=>{console.log(error)},
        complete: ()=>{console.log( )}  
   
      });
    })
  } 

  getPhotoUrl(){
    return false;
  }
}
