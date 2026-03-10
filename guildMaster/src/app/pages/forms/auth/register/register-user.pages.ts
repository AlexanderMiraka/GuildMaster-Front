import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'register-user',
  standalone: true,
  templateUrl: './register-user.pages.html',
  styleUrl: './register-user.pages.scss',
  imports: [ReactiveFormsModule],
})
export class RegisterUser {
  registerForm: FormGroup;
  submitted: boolean = false;
  sub: Subscription = new Subscription();
  ngOnInit() {
    this.sub = this.registerForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }
  // On init subscrbe to the observable of form group valueChanges to see if a value
  // changed and lower the flag that the error raised
  constructor() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl(
          '',
          Validators.compose([Validators.email, Validators.required]),
        ),
        username: new FormControl('', Validators.required),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('^[a-zA-Z\d!@#$%^&*]{8,16}$'),
            Validators.required,
          ]),
        ),
        repeatPassword: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('^[a-zA-Z\d!@#$%^&*]{8,16}$'),
            Validators.required,
          ]),
        ),
        firstName: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('[a-zA-Z]*'),
            Validators.required,
          ]),
        ),
        lastName: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('[a-zA-Z]*'),
            Validators.required,
          ]),
        ),
        dob: new FormGroup({
          day: new FormControl(1),
          month: new FormControl(1),
          year: new FormControl(1900),
        }),
        bio: new FormControl(''),
        profession: new FormControl(''),
      },
      {
        validators: this.matchPassValidator,
      },
    );
  }
  matchPassValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    return password?.value !== repeatPassword?.value
      ? { mismatch: true }
      : null;
  };
  // custom validator for password. Give the signature of the ValidatorFn
  // so it can be used as a reactive form then make a simple check that returns either true if the
  // passwords don't match or null id they do
  register(): void {
    this.submitted = true;
    console.log(this.registerForm.errors);
  }
  // method on submit
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  //destroy the manual subscription
}
