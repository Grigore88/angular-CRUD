import { Doc } from './../../Doc';
import { DocServiceService } from './../../services/doc.service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.css']
})
export class DocFormComponent {

myForm: FormGroup;

constructor(private fb: FormBuilder,
   private docService: DocServiceService,
   private router: Router){}

ngOnInit(){
this.myForm = new FormGroup({
  docType: new FormControl(''),
  docNumber: new FormControl(''),
  expireDate: new FormControl('')
});}

onSubmit(){
  const doc: Doc = this.myForm.value;
  this.docService.saveDoc(doc).subscribe({
    next: c=>{console.log(c)},
    error: error=>{console.log(error)},
    complete: ()=>{this.router.navigate(['/docs/'])}
  })
}

}
