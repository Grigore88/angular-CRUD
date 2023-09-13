import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:8080';
 // private username:string ='';
  //private password:string ='';
  //private base64Credentials = ''; //'Zzox'
  //private headers= new HttpHeaders({
  //  'Content-Type': 'application/json',
    
    
   // Authorization: 'Basic ' + this.base64Credentials//btoa(`${this.username}:${this.password}`) // Base64 encoded username:password
 // });
  
  constructor(private http: HttpClient) {}
getHeahers():HttpHeaders{
  const username = sessionStorage.getItem('username');
  const password =sessionStorage.getItem('password');
  const base64Credentials = btoa(`${username}:${password}`)
  //console.log(this.username + this.password + 'in authService' + this.base64Credentials)
   //console.log(this.headers.get('Authorization'));
   const headers= new HttpHeaders({
    'Content-Type': 'application/json',
    
    
    Authorization: 'Basic ' + base64Credentials//btoa(`${this.username}:${this.password}`) // Base64 encoded username:password
  });
  return headers;
}
  
}
