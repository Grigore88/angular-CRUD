import { PersonsComponent } from './persons/persons.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


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
    CompanyUpdateFormComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent, children:[
        {path: '', component: NavbarComponent, children:[
          {path: 'personUpdateForm/:id', component: PersonUpdateFormComponent},
          {path: 'personForm', component: PersonFormComponent},
          {path : 'persons', component: PersonsComponent},
          {path: 'hours', component: HoursCalculatorComponent},
          {path: 'personInfo/:id', component: PersonInfoComponent},
          {path: 'docs', component: DocPageComponent},
          {path: 'docForm', component: DocFormComponent},
          {path: 'docUpdateForm/:id', component:DocUpdateFormComponent},
          {path: 'companies', component: CompanyPageComponent},
          {path: 'companyForm', component: CompanyFormComponent},
          {path: 'companyInfo/:id', component: CompanyInfoComponent},
          {path: 'companyUpdateForm/:id', component: CompanyUpdateFormComponent}
          ]}
       ]},
      ])
    

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
