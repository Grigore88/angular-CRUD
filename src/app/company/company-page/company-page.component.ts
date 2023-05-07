import { CompanyService } from './../../services/company.service';
import { Component } from '@angular/core';
import { Company } from 'src/app/Company';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent {

public companies:Company[];
updatedListTime: string;

constructor(private companyService: CompanyService){}

ngOnInit(): void {
  this.getCompanies();
 }

public getCompanies(): void{
this.companyService.getAllCompanies().subscribe({
  next: c=>{this.companies=c},
  error: error=>{alert(error.message)},
  complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
})}

clear(){
  this.clear=null;
}

public getUpdatedListTime(){
  return "updated " + this.updatedListTime;
 }
}
