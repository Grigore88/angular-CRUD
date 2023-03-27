import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hours-calculator',
  templateUrl: './hours-calculator.component.html',
  styleUrls: ['./hours-calculator.component.css']
})
export class HoursCalculatorComponent {
  myForm: FormGroup;
  constructor(private fb: FormBuilder){}
  ngOnInit(){
    this.myForm = new FormGroup({
      day: new FormArray([
        new FormGroup({
          startHour: new FormControl,
          startMinutes: new FormControl,
          pause: new FormControl,
          endHour: new FormControl,
          endMinutes: new FormControl
        })
      ])
    })  
    for(let i= 0; i<30; i++){
      this.addDay()
    }
  }
  get dayForm(){
   return this.myForm.get('day') as FormArray;
  }
  addDay(){
    const dayHours = new FormGroup({
    startHour: new FormControl,
    startMinutes: new FormControl,
    pause: new FormControl,
    endHour: new FormControl,
    endMinutes: new FormControl
    })
    this.dayForm.push(dayHours);
  }
  calculateHours(dayIndex: number): number {
    const day = this.dayForm.controls[dayIndex] as FormGroup;
    const startHour = day.controls.startHour.value || 0;
    const startMinutes = day.controls.startMinutes.value || 0;
    const endHour = day.controls.endHour.value || 0;
    const endMinutes = day.controls.endMinutes.value || 0;
    const pause = day.controls.pause.value || 0;
    const startTotal = startHour * 60 + startMinutes;
    const endTotal = endHour * 60 + endMinutes;
    return (endTotal - startTotal - pause);
    //return (endTotal - startTotal - pause) / 60;
  }
  calculateDaylyHours(dayIndex: number): string{
    let totalMinutes = this.calculateHours(dayIndex);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    //return ` ${hours}:${minutes}`;
    return ` ${hours}:${minutes.toString().padStart(2, '0')}`

  }
  calculateTotalHours(): string {
    let totalMinutes = 0;
    for (let i = 0; i < this.dayForm.length; i++) {
      totalMinutes += this.calculateHours(i);
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    //return ` ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return ` ${hours}:${minutes.toString().padStart(2, '0')}`;
  }
  

}
