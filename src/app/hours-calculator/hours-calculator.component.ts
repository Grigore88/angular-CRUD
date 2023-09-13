import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hours-calculator',
  templateUrl: './hours-calculator.component.html',
  styleUrls: ['./hours-calculator.component.css']
})
export class HoursCalculatorComponent {
  myForm: FormGroup;
  pauseValue: number;
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
  
  

addAllPauses() {
  const dayFormArray = this.myForm.get('day') as FormArray;
  dayFormArray.controls.forEach(dayFormGroup => {
    if(dayFormGroup.get('startHour').value){
    dayFormGroup.get('pause').setValue(this.pauseValue);
    }
  });
  //console.log(this.pauseValue);
}

exportToExcel() {
  const workbook = XLSX.utils.book_new();
  const worksheetData = [];

  // Prepare the header row
  const headerRow = ['Start Hour', 'Start Minutes', 'Pause', 'End Hour', 'End Minutes'];
  worksheetData.push(headerRow);

  // Add data for each day
  this.dayForm.controls.forEach(dayFormGroup => {
    const dataRow = [
      dayFormGroup.get('startHour').value || '',
      dayFormGroup.get('startMinutes').value || '',
      dayFormGroup.get('pause').value || '',
      dayFormGroup.get('endHour').value || '',
      dayFormGroup.get('endMinutes').value || '',
    ];
    worksheetData.push(dataRow);
  });

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hours Calculator Data');

  // Generate the XLSX file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const fileName = 'hours_calculator_data.xlsx';

  // Create a download link and trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.download = fileName;
  downloadLink.click();
}

// Import from excell
onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file: File = (input.files as FileList)[0];
  
  if (file) {
    this.readExcelData(file);
  }
}

readExcelData(file: File) {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);

  fileReader.onload = (e) => {
    const bufferArray = e.target?.result;
    const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'array' });

    // Assuming your Excel file has data in the first sheet
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    // Parse the data from the sheet and update your form
    const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

    for (let i = 1; i < data.length; i++) {
      const rowData: any[] = data[i];
      const dayFormGroup = this.createDayFormGroup(rowData);

      // Find the existing index of the day (if it exists)
      const existingIndex = this.findExistingDayIndex(dayFormGroup);

      if (existingIndex !== -1) {
        // If the day already exists, update the existing form control values
        this.dayForm.setControl(existingIndex, dayFormGroup);
      } else {
        // Otherwise, add the new day FormGroup
        this.dayForm.push(dayFormGroup);
      }
    }
  };
}

findExistingDayIndex(newDayFormGroup: FormGroup): number {
  // Find the index of the day with matching startHour and startMinutes
  const startHour = newDayFormGroup.get('startHour')?.value;
  const startMinutes = newDayFormGroup.get('startMinutes')?.value;

  return this.dayForm.controls.findIndex((dayFormGroup) => {
    return (
      dayFormGroup.get('startHour')?.value === startHour &&
      dayFormGroup.get('startMinutes')?.value === startMinutes
    );
  });
}

createDayFormGroup(rowData: any[]): FormGroup {
  // Here, you need to map the values from rowData to appropriate form controls
  // and return a new FormGroup for each row.
  // For example:
  return new FormGroup({
    startHour: new FormControl(rowData[0]),
    startMinutes: new FormControl(rowData[1]),
    pause: new FormControl(rowData[2]),
    endHour: new FormControl(rowData[3]),
    endMinutes: new FormControl(rowData[4]),
  });
}


}
