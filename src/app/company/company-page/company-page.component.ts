import { CompanyService } from './../../services/company.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Company } from 'src/app/Company';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent {

public companies:Company[];
public filteredCompanies:Company[];
updatedListTime: string;
searchTerm = new FormControl();

constructor(private companyService: CompanyService){}

ngOnInit(): void {
  this.getCompanies();
  this.searchTerm.valueChanges
    .pipe(
      debounceTime(300), // Add a delay before triggering the search
      distinctUntilChanged() // Trigger the search only if the search term changes
    )
    .subscribe((searchValue: string) => {
      // Call a method to perform the search based on the searchValue
      this.searchCompanies(searchValue);
    });
 }

 searchCompanies(searchValue: string) {
  this.filteredCompanies = this.companies.filter((company: Company) => {
    // Perform case-insensitive search on relevant fields
    return (
      company.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      company.city?.toLowerCase().includes(searchValue.toLowerCase()) ||
      company.street?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      company.comments?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      company.openHours?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      (company.contacts && company.contacts.some(contact =>
        contact.replace(/\s/g,'').toLowerCase().includes(searchValue.toLowerCase())))||
      (company.workers && company.workers.some(worker =>
        worker.toLowerCase().includes(searchValue.toLowerCase())))  
    );
  });
}

public getCompanies(): void{
this.companyService.getAllCompanies().subscribe({
  next: c=>{this.companies=c},
  error: error=>{alert(error.message)},
  complete: ()=>{this.updatedListTime= new Date().toLocaleTimeString()}
})}

clear(){
  this.filteredCompanies=null;
  this.searchTerm.defaultValue;
}

public getUpdatedListTime(){
  return "updated " + this.updatedListTime;
 }

 sortCompanies(sortBy: keyof Company): void {
  this.companies.sort((a:Company, b:Company) => {
    // Perform the sorting based on the provided criterion
    
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  });
}


}


