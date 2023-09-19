import { Component } from '@angular/core';
import { Eveniment } from 'src/app/eveniment';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {
constructor(private eventService: EventService){}
public events: Eveniment[];

ngOnInit(): void {
  this.getEvents();
  
}

public getEvents(){
  this.eventService.getEvents().subscribe({
    next: c => {this.events = c},
    error: error=>{console.log(error)},
    complete: ()=>{console.log( this.events)}
  })
}
public deleteEvent(id :string){
  const confirmation = window.confirm('Are you sure?');
        if (confirmation){
          this.eventService.deleteEvent(id).subscribe({
            next: c => {console.log(c)},
            error: error=>{console.log(error)},
            complete: ()=>{this.ngOnInit()}
          });
          console.log("deleting in main page" + id)
        }
        else{}
  
}
}
