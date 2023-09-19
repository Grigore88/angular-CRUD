import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eveniment } from '../eveniment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = 'http://localhost:8080/events'
  constructor(private http:HttpClient) { }

   // Get all events
   getEvents(): Observable<Eveniment[]> {
    return this.http.get<Eveniment[]>(this.url);
  }

  // Save a new event
  saveEvent(eventData: Eveniment): Observable<Eveniment> {
    return this.http.post<Eveniment>(this.url, eventData);
  }

  // Get an event by its ID
  getEventById(eventId:string): Observable<Eveniment> {
    const eventUrl = `${this.url}/${eventId}`;
    return this.http.get<Eveniment>(eventUrl);
  }

  // Update an existing event
  updateEvent(event:Eveniment): Observable<Eveniment> {
    
    return this.http.put<Eveniment>(this.url, event);
  }

  // Delete an event by its ID
  deleteEvent(eventId: string): Observable<any> {
    const eventUrl = `${this.url}/${eventId}`;
    return this.http.delete<any>(eventUrl);
  }
}
