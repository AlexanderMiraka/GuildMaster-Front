import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector:'register-user',
    standalone:true,
    templateUrl:'./register-user.pages.html',
    styleUrl:'./register-user.pages.scss',
    imports:[ReactiveFormsModule],
})
export class RegisterUser{
    registerForm: FormGroup;
    constructor() {
        this.registerForm = new FormGroup({
            email: new FormControl('',Validators.compose([Validators.email,Validators.required])),
            username: new FormControl('',Validators.required),
            password: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z\d!@#$%^&*]{8,16}$'),Validators.required])),
            repeatPassword: new FormControl('',Validators.compose([Validators.pattern('^[a-zA-Z\d!@#$%^&*]{8,16}$'),Validators.required])),
            firstName: new FormControl('',Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.required])),
            lastName: new FormControl('',Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.required])),
            dob: new FormGroup({
                day:new FormControl(1),
                month:new FormControl(1),
                year:new FormControl(1900)
            }),
            bio: new FormControl(''),
            profession: new FormControl(''),
        },{
            validators:this.matchPassValidator
        });
    }
    matchPassValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
        const password = this.registerForm.get('password');
        const repeatPassword = this.registerForm.get('repeatPassword');
        return password?.value!==repeatPassword?.value ? {mismatch:true} : null;
    };
    // custom validator for password. Give the signature of the ValidatorFn 
    // so it can be used as a reactive form then make a simple check that returns either true if the 
    // passwords don't match or null id they do
}