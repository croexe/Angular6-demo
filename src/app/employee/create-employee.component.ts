import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      eMail: [''],
        skills: this.fb.group({
          skillName: [''],
          experienceInYears: [''],
          proficiency: ['beginner']
        })
    });

    this.employeeForm.valueChanges.subscribe(( value: any ) => 
    {  
      console.log(JSON.stringify);
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
