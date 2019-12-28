import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms'
import {CustomValidators} from 'src/app/Shared/custom.validators'

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
    'confirmEmail': '',
    'emailGroup': '',
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
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be gmail.com.',
    },
    'confirmEmail': {
      'required': 'You need to confirm your email.',
    },
    'emailGroup': {
      'emailMismatch' : 'Your emails need to match.',
    },
    'phone': {
      'required': 'Phone is required.',
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
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['',[Validators.required, CustomValidators.emailDomain('gmail.com')]],
        confirmEmail: ['', Validators.required]
      }, {validator: matchEmail}),
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onConctactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      console.log(this.logValidationErrors(this.employeeForm));
    });
  }

  onConctactPreferenceChange(selectedValue: string) {
    var controls = this.employeeForm.get('phone');
    if(selectedValue === 'phone'){
      controls.setValidators(Validators.required);
    } else {
      controls.clearValidators();
     } 
     controls.updateValueAndValidity();


  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
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

function matchEmail(group: AbstractControl): {[key: string] : any} | null{
const emailControl = group.get('email');
const confirmEmailControl = group.get('confirmEmail');

if(emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine){
  return null;
} else {
  return {'emailMismatch': true};
}
}
