import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      eMail: new FormControl(),
        skills: new FormGroup({
          skillName: new FormControl(),
          experienceInYears: new FormControl(),
          proficiency: new FormControl()
        })
    });
  }

  onLoadDataClick(): void {
    this.employeeForm.setValue({
      fullName: 'Irinej Tech',
      eMail: 'Irinejs@gmail.com',
      skills: {
        skillName: 'C#',
        experienceInYears: 3,
        proficiency: 'intermidiete'
      }
    })
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }
}
