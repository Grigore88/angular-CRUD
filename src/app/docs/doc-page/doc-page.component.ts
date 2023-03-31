import { Doc } from './../../Doc';
import { DocServiceService } from './../../services/doc.service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.css']
})
export class DocPageComponent {
  constructor(private docDervice:DocServiceService){}
public docs:Doc[];

ngOnInit(): void {
  this.getDocs();
  console.log("lista: " + this.docs);
}

public getDocs(){
  this.docDervice.getAllDocs().subscribe({
    next: c => {this.docs = c},
    error: error=>{console.log(error)},
    complete: ()=>{console.log( this.docs)}
  })
}
public deleteDoc(id :string){
  this.docDervice.deleteDoc(id).subscribe({
    next: c => {console.log(c)},
    error: error=>{console.log(error)},
    complete: ()=>{this.ngOnInit()}
  });
  console.log("deleting in main page" + id)
}
}
