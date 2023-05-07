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
  getCompanyById(id: string): Observable<Company> {
    const url = `${this.url}/${id}`;
    return this.http.get<Company>(url);
  }

  saveCompany(company: Company): Observable<Company>{
    console.log(company);
    return this.http.post<Company>(this.url, company);
    }
   
    updateCompany(company: Company): Observable<Company> {
      return this.http.put<Company>(this.url, company);
    }     

}
