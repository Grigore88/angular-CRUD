

import { Observable } from 'rxjs';
import { Doc } from './../Doc';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DocServiceService {
 private url = `${environment.API_BASE_URL}/docs`;

  constructor(private http:HttpClient) {}
  getURL():string {
    const url = `${this.url}`;
    return url;
  }
  getAllDocs():Observable<Doc[]>{
    return this.http.get<Doc[]>(this.url);
  }
  saveDoc(doc: Doc): Observable<Doc>{
    console.log(doc);
    return this.http.post<Doc>(this.url, doc);
    }
  getDocById(id: string): Observable<Doc> {
      const url = `${this.url}/${id}`;
      return this.http.get<Doc>(url);
    } 
  updateDoc(doc: Doc): Observable<Doc> {
      //const url = `${this.url}/${person.id}`;  jos era (url, person);
      return this.http.put<Doc>(this.url, doc);
    }     
  deleteDoc(id: string): Observable<string> {
    const url = `${this.url}/delete/${id}`;
    console.log(url)
     return this.http.get<string>(url);
  }
}
