import { Observable } from 'rxjs';
import { PersonService } from './services/person.service';
import { Address } from './address';
import { Car } from './car';
import { Person } from './person';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '';
  constructor(){}
  
  
  
  ngOnInit(): void {
   
  }
  

}

