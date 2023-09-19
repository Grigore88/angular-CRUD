import { AuthService } from './../auth.service';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from '@angular/common/http';
import { Person } from '../person';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'http://localhost:8080/person'
 
  constructor(private http: HttpClient, private authService:AuthService) { }

  getAllPersons():Observable<Person[]>{
    console.log(this.authService.getHeahers().get('Authorization'))
    return this.http.get<Person[]>(this.url, );//{headers:this.authService.getHeahers()}
  }
  getPersonsByMonthOfBirth(month: number):Observable<Person[]>{
    const url = `${this.url}/byMonth/${month}`;
    return this.http.get<Person[]>(url); //{headers:this.authService.getHeahers()}
  }
  getPersonsBySearch(searchText: string ):Observable<Person[]>{
   const url = `${this.url}/search/${searchText}`;
   return this.http.get<Person[]>(url);
  }
  savePerson(person: Person): Observable<Person>{
    console.log(person);
    return this.http.post<Person>(this.url, person);
    }

    getPersonById(id: string): Observable<Person> {
      const url = `${this.url}/${id}`;
      return this.http.get<Person>(url);
    }
    getPersonsByIdArray(peronsId:string[]):Person[]{
      const persons:Person[] = [];
    peronsId.forEach(personId => {
    this.getPersonById(personId).subscribe((person: Person) => {
      persons.push(person);
    });})
    return persons;
    }
    personIdToHashMap(personsId: string[]): { [key: string]: Person } {
      const persons:Person[] = this.getPersonsByIdArray(personsId);
      const hashMap: { [key: string]: Person } = {};
  
      persons.forEach(person => {
        hashMap[person.id] = person;
      });
  
      return hashMap;
    }
  
    updatePerson(person: Person): Observable<Person> {
      //const url = `${this.url}/${person.id}`;  jos era (url, person);
      return this.http.put<Person>(this.url, person);
    } 

  
    isPersonByFirstNameAndLastName(firstName: string, lastName: string): Observable<Boolean>{
      const url = `${this.url}/name?firstName=${firstName}&lastName=${lastName}`;
      return this.http.get<Boolean>(url);
    }
}
