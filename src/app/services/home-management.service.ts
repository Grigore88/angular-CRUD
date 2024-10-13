import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Location } from '../models/location';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class HomeManagementService {

  private apiUrl = 'http://localhost:8080/api'; // Adjust to your API base URL

  constructor(private http: HttpClient) { }

  // Location-related methods
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/locations`);
  }

  getLocation(id: String): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/locations/${id}`);
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/locations`, location);
  }

  deleteLocation(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/locations/${id}`);
  }

  // Place-related methods
  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/places`);
  }

  getPlace(id: String): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/places/${id}`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.apiUrl}/places`, place);
  }

  deletePlace(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/places/${id}`);
  }

  // Item-related methods
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getItem(id: String): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/items`, item);
  }

  deleteItem(id: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`);
  }

  updateLocation(location: Location): Observable<Location> {
    const url = `${this.apiUrl}/locations`;
    return this.http.put<Location>(url, location);
  }

  // Update Place
  updatePlace(place: Place): Observable<Place> {
    const url = `${this.apiUrl}/places`;
    return this.http.put<Place>(url, place);
  }

  // Update Item
  updateItem( item: Item): Observable<Item> {
    const url = `${this.apiUrl}/items`;
    return this.http.put<Item>(url, item);
  }
}
