import { Doc } from './../../Doc';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DocServiceService } from './../../services/doc.service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doc-update-form',
  templateUrl: './doc-update-form.component.html',
  styleUrls: ['./doc-update-form.component.css']
})
export class DocUpdateFormComponent {
  myForm:FormGroup;
  doc: Doc;
  id: string;

  constructor(private fb: FormBuilder,
    private docService: DocServiceService,
    private route: ActivatedRoute) { }

    ngOnInit(){
      this.myForm = new FormGroup({
        id: new FormControl(''),
        docType: new FormControl(''),
        docNumber: new FormControl(''),
        expireDate: new FormControl('')
      });

      this.route.paramMap.subscribe(params =>{this.id = params.get('id');});
      this.docService.getDocById(this.id).subscribe({
        next: c=>{this.doc = c;
        this.myForm.patchValue({
          id: this.doc.id,
          docType: this.doc.docType,
          docNumber: this.doc.docNumber,
          expireDate: this.doc.expireDate
        })},
        error: error=>{console.log(error)},
        complete: ()=>{console.log( this.doc)}
      })}
      onSubmit() {
        const doc: Doc = this.myForm.value;
        this.docService.updateDoc(doc).subscribe({
          next: (value)=>{console.log(value)},
          error: (err)=>{console.log(err)},
          complete:()=>{this.doc=null}
        })}
}
