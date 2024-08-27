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
today: Date = new Date();
selectedMonth: number | null = null;


ngOnInit(): void {
this.sortEventsByMonth(this.getCurrentMonth() + 1);
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

getCurrentMonth(): number {
  return this.today.getMonth(); 
}

// Calculate days remaining till the event date
calculateDaysRemaining(eventDate: Date): number {
  const timeDifference = new Date(eventDate).getTime() - this.today.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

// Calculate years passed since the event date
calculateYearsPassed(eventDate: Date): number {
  const eventYear = eventDate.getFullYear();
  const currentYear = this.today.getFullYear();
  return currentYear - eventYear;
}


sortEventsByMonth(chosenMonth: number) {
  //if(this.chosenMonth==null||this.chosenMonth==undefined){}
   // else{
    this.eventService.getEventsByMonth(chosenMonth).subscribe({
      next: c => {this.events = c},
    error: error=>{console.log(error)},
    complete: ()=>{}
    })
 // }
}

 // Method to check if the event birthday is today
 isBirthdayToday(dateOfBirth: Date): boolean {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  return (
    today.getDate() === birthDate.getDate() &&
    today.getMonth() === birthDate.getMonth()
  );
}

}
