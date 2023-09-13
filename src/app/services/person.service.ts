import { AuthService } from './../auth.service';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from '@angular/common/http';
import { Person } from '../person';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'http://localhost:8080/person'
 
  constructor(private http: HttpClient, private authService:AuthService) { }

  getAllPersons():Observable<Person[]>{
    console.log(this.authService.getHeahers().get('Authorization'))
    return this.http.get<Person[]>(this.url, {headers:this.authService.getHeahers()});
  }
  getPersonsByMonthOfBirth(month: number):Observable<Person[]>{
    const url = `${this.url}/byMonth/${month}`;
    return this.http.get<Person[]>(url,{headers:this.authService.getHeahers()});
  }
  getPersonsBySearch(searchText: string ):Observable<Person[]>{
   const url = `${this.url}/search/${searchText}`;
   return this.http.get<Person[]>(url);
  }
  savePerson(person: Person): Observable<Person>{
    console.log(person);
    return this.http.post<Person>(this.url, person, {headers:this.authService.getHeahers()});
    }

    getPersonById(id: string): Observable<Person> {
      const url = `${this.url}/${id}`;
      return this.http.get<Person>(url,{headers:this.authService.getHeahers()});
    }
  
    updatePerson(person: Person): Observable<Person> {
      //const url = `${this.url}/${person.id}`;  jos era (url, person);
      return this.http.put<Person>(this.url, person,{headers:this.authService.getHeahers()});
    } 

  
    isPersonByFirstNameAndLastName(firstName: string, lastName: string): Observable<Boolean>{
      const url = `${this.url}/name?firstName=${firstName}&lastName=${lastName}`;
      return this.http.get<Boolean>(url,{headers:this.authService.getHeahers()});
    }
}
