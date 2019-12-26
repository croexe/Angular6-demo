import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'phone' : {
      'required' : 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['Email'],
      email: ['', Validators.required],
      phone: [''],
        skills: this.fb.group({
          skillName: ['', Validators.required],
          experienceInYears: ['', Validators.required],
          proficiency: ['', Validators.required]
        })
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      console.log(this.logValidationErrors(this.employeeForm));
    })
  }

  onConctactPreferenceChange(selectedValue : string){
    const phoneControle = this.employeeForm.get('phone');
    if(selectedValue === 'phone'){
      phoneControle.setValidators(Validators.required);
    } else {
      phoneControle.clearValidators();
    }
      phoneControle.updateValueAndValidity();
    }
  
  logValidationErrors(group: FormGroup = this.employeeForm) : void {
    Object.keys(group.controls).forEach((key: string) =>{
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if(abstractControl && !abstractControl.valid && 
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          
          for ( const errorKey in abstractControl.errors){
            if(errorKey){
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onLoadDataClick(): void {
   // this.logValidationErrors(this.employeeForm);
   // console.log(this.formErrors);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }
}