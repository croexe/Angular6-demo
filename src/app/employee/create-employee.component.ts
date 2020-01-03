import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl, FormArray } from '@angular/forms'
import {CustomValidators} from 'src/app/Shared/custom.validators'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  formErrors = {
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
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onConctactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      console.log(this.logValidationErrors(this.employeeForm));
    });
  }

  addSkillButtonClick(): void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
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
    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    //FormArray is serialized as a array
    const formArrayy = this.fb.array([
      new FormControl('Jova', Validators.required),
      new FormControl('Steva', Validators.required),
      new FormControl('', Validators.required)
    ]);

    //FormGroup is serialized as a object
    const formGroup = this.fb.group([
      new FormControl('Jova', Validators.required),
      new FormControl('Steva', Validators.required),
      new FormControl('', Validators.required)
    ]);

    formArrayy.push(new FormControl('Milojče', Validators.required),)

    console.log(formArrayy);
    console.log(formGroup);

    console.log(formArray.length);
    for(const control of formArray.controls){
      if(control instanceof FormControl){
        console.log('Form Control');
      }
      if(control instanceof FormGroup){
      console.log('Form Group');
      }
      if(control instanceof FormArray){
        console.log('Form Array');
      }
    }
    console.log(formArrayy.valid);

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
