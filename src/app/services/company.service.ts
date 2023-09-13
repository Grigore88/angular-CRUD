import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../Company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = 'http://localhost:8080/company'

  constructor(private http: HttpClient) { }

  getAllCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(this.url);
  }
  refreshLocalStorage(){
    let companies:Company[];
    localStorage.removeItem('companiesData');
    this.getAllCompanies().subscribe({
      next: c=>{
        companies=c;
        
        // Update the update timestamp
        let updatedListTime = new Date().toLocaleTimeString("en-US", { hour12: false }) +' '+ new Date().toLocaleDateString();
        // Save both the companies list and the update timestamp to local storage
        const dataToSave = {
          companies: companies,
          updatedListTime: updatedListTime
        };
      
      // Save the updated companies list to local storage
      localStorage.setItem('companiesData', JSON.stringify(dataToSave));
    },
      error: error=>{alert(error.message)},
      complete: ()=>{}
    })

    }
  
  getCompanyById(id:string):Observable<Company>{
    const url = `${this.url}/${id}`;
    return this.http.get<Company>(url);
  }
  getCompanyByIdfromLocalStorage(companyId: string): Company | null //Observable<Company> 
    //const url = `${this.url}/${id}`;
    //return this.http.get<Company>(url);
    // Load the companies data from local storage
    {
  const savedData = localStorage.getItem('companiesData');
  
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    const companies: Company[] = parsedData.companies;

    // Find the company with the matching ID
    const foundCompany = companies.find(company => company.id === companyId);

    if (foundCompany) {
      return foundCompany;
    }
  }

  // If the company with the specified ID is not found, return null or handle the error as needed
  return null;
  }

  saveCompany(company: Company): Observable<Company>{
    console.log(company);
    return this.http.post<Company>(this.url, company);
    }
   
    updateCompany(company: Company): Observable<Company> {
      return this.http.put<Company>(this.url, company);
    }     

}
