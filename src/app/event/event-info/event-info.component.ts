import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eveniment } from 'src/app/eveniment';
import { Person } from 'src/app/person';
import { EventService } from 'src/app/services/event.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent {

  event: Eveniment; // Store the event details
  persons: Person[] = []; // Store the associated persons

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    // Retrieve the event ID from the route parameters
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      // Fetch event details using the EventService
      this.eventService.getEventById(eventId).subscribe((event: Eveniment) => {
        this.event = event;
        console.log(this.event);

        // Fetch associated persons using the PersonService
        this.event.personsId.forEach(personId => {
          this.personService.getPersonById(personId).subscribe((person: Person) => {
            this.persons.push(person);
          });
        });
      });
    }
  }
}
