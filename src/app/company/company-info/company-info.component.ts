import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent {

  company: Company;
  id: string;
 
  constructor(private companyService: CompanyService,
    private route: ActivatedRoute){}
    ngOnInit(){
      this.route.paramMap.subscribe(params =>{
          this.id = params.get('id');
          this.company=this.companyService.getCompanyByIdfromLocalStorage(this.id);}
          )}
     // this.route.paramMap.subscribe(params =>{
      //  this.id = params.get('id');
       // this.companyService.getCompanyById(this.id).subscribe({
        //  next: c => { this.company= c},
        //  error: error=>{console.log(error)},
        //  complete: ()=>{console.log( this.company)}
      
   // })})
  
  
 getGoogleRef(lat:string, long:string){
  return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
 }

}
