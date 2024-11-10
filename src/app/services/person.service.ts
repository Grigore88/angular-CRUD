import { AuthService } from './../auth.service';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from '@angular/common/http';
import { Person } from '../person';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = `${environment.API_BASE_URL}/person`;
 
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
    personIdToMap(personsId: string[]): Map<string, Person> {
      let persons:Person[]=[];
      let map: Map<string, Person> = new Map();
      personsId.forEach(personId => {
        this.getPersonById(personId).subscribe({
          next: (person: Person) => {persons.push(person);},
          error: error=>{console.log(error)},
        complete: ()=>{persons.forEach(person => {
          console.log(person.id)
          map.set(person.id, person)
        });
        }
        })
        ;})
      return map;
    }
    getAllPersonsMap(persons: Person[]): Map<string, Person>{
      let map: Map<string, Person> = new Map();
      persons.forEach(person => {
        map.set(person.id, person)
      });
      return map;
    }
    updatePerson(person: Person): Observable<Person> {
      //const url = `${this.url}/${person.id}`;  jos era (url, person);
      return this.http.put<Person>(this.url, person);
    } 
    deletePerson(personId: string): Observable<any> {
      const eventUrl = `${this.url}/${personId}`;
      return this.http.delete<any>(eventUrl);
    }
  
    isPersonByFirstNameAndLastName(firstName: string, lastName: string): Observable<Boolean>{
      const url = `${this.url}/name?firstName=${firstName}&lastName=${lastName}`;
      return this.http.get<Boolean>(url);
    }
}
