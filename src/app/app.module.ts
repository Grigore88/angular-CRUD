import { Place } from './models/place';

import { PersonsComponent } from './persons/persons.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PersonUpdateFormComponent } from './person-update-form/person-update-form.component';
import { HoursCalculatorComponent } from './hours-calculator/hours-calculator.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { DocPageComponent } from './docs/doc-page/doc-page.component';
import { DocFormComponent } from './docs/doc-form/doc-form.component';
import { DocUpdateFormComponent } from './docs/doc-update-form/doc-update-form.component';
import { CompanyPageComponent } from './company/company-page/company-page.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { CompanyUpdateFormComponent } from './company/company-update-form/company-update-form.component';
import { LoginComponent } from './login/login.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventUpdateComponent } from './event/event-update/event-update.component';
import { EventPageComponent } from './event/event-page/event-page.component';
import { EventInfoComponent } from './event/event-info/event-info.component';
import { ItemPageComponent } from './homeManagement/item-page/item-page.component';
import { ItemFormComponent } from './homeManagement/item-form/item-form.component';
import { LocationFormComponent } from './homeManagement/location-form/location-form.component';
import { PlaceFormComponent } from './homeManagement/place-form/place-form.component';
import { ItemInfoComponent } from './homeManagement/item-info/item-info.component';
import { ItemUpdateFormComponent } from './homeManagement/item-update-form/item-update-form.component';
import { ManagementToolsPageComponent } from './homeManagement/management-tools-page/management-tools-page.component';
import { LocationUpdateFormComponent } from './homeManagement/location-update-form/location-update-form.component';
import { PlaceUpdateFormComponent } from './homeManagement/place-update-form/place-update-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    PersonsComponent,
    NavbarComponent,
    PersonUpdateFormComponent,
    HoursCalculatorComponent,
    PersonInfoComponent,
    DocPageComponent,
    DocFormComponent,
    DocUpdateFormComponent,
    CompanyPageComponent,
    CompanyFormComponent,
    CompanyInfoComponent,
    CompanyUpdateFormComponent,
    LoginComponent,
    EventFormComponent,
    EventUpdateComponent,
    EventPageComponent,
    EventInfoComponent,
    PlaceFormComponent,
    LocationFormComponent,
    ItemPageComponent,
    ItemFormComponent,
    ItemInfoComponent,
    ItemUpdateFormComponent,
    ManagementToolsPageComponent,
    LocationUpdateFormComponent,
    PlaceUpdateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent, children: [
        { path: '', component: NavbarComponent, children: [
          { path: 'persons', component: PersonsComponent },
          { path: 'personForm', component: PersonFormComponent },
          { path: 'personUpdateForm/:id', component: PersonUpdateFormComponent },
          { path: 'personInfo/:id', component: PersonInfoComponent },
          { path: 'hours', component: HoursCalculatorComponent },
          { path: 'docs', component: DocPageComponent },
          { path: 'docForm', component: DocFormComponent },
          { path: 'docUpdateForm/:id', component: DocUpdateFormComponent },
          { path: 'companies', component: CompanyPageComponent },
          { path: 'companyForm', component: CompanyFormComponent },
          { path: 'companyInfo/:id', component: CompanyInfoComponent },
          { path: 'companyUpdateForm/:id', component: CompanyUpdateFormComponent },
          { path: 'login', component: LoginComponent },
          { path: 'eventPage', component: EventPageComponent },
          { path: 'eventForm', component: EventFormComponent },
          { path: 'eventUpdateForm/:id', component: EventUpdateComponent },
          { path: 'eventInfo/:id', component: EventInfoComponent },
          { path: 'itemPage', component: ItemPageComponent },
          { path: 'itemForm', component: ItemFormComponent },
          { path: 'itemInfo/:id', component: ItemInfoComponent },
          { path: 'itemUpdateForm/:id', component: ItemUpdateFormComponent },
          { path: 'managementTools', component: ManagementToolsPageComponent },
          { path: 'locationForm', component: LocationFormComponent },
          { path: 'locationUpdateForm/:id', component: LocationUpdateFormComponent },
          { path: 'placeForm', component: PlaceFormComponent },
          { path: 'placeUpdateForm/:id', component: PlaceUpdateFormComponent },
          { path: '**', redirectTo: 'persons' } // Optional 404 handling
        ]}
      ]},
    ])
  ],
  providers: [ 
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
