
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Person } from '../person';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'http://localhost:8080/person'

  constructor(private http: HttpClient) { }

  getAllPersons():Observable<Person[]>{
    return this.http.get<Person[]>(this.url);
  }
  getPersonsByMonthOfBirth(month: number):Observable<Person[]>{
    const url = `${this.url}/byMonth/${month}`;
    return this.http.get<Person[]>(url);
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
  
    updatePerson(person: Person): Observable<Person> {
      //const url = `${this.url}/${person.id}`;  jos era (url, person);
      return this.http.put<Person>(this.url, person);
    } 
}
