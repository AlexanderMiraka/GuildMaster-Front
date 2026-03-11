import { Component, inject } from '@angular/core';
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
import { registerService } from '../../../../services/auth/register.service';

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
  constructor(private fromService: registerService) {
    this.registerForm = new FormGroup(
      {
        email: new FormControl(
          '',
          Validators.compose([Validators.email, Validators.required]),
        ),
        username: new FormControl('', Validators.required),
        password: new FormControl(
          '',
          Validators.compose([Validators.pattern(''), Validators.required]),
        ),
        repeatPassword: new FormControl(
          '',
          Validators.compose([Validators.pattern(''), Validators.required]),
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
    //check if controls in form group have an error field and push them to an array
    let invalidInputs: unknown[] = [];
    let isInvalid = Object.keys(this.registerForm.controls).forEach((key) => {
      const toBoolExpr = this.registerForm.get(key)?.errors;
      if (toBoolExpr) {
        invalidInputs.push(toBoolExpr);
      }
    });
    //if the errors array is empty and the form group does not have the password mismatch error.
    //procced with the service store
    if (invalidInputs.length === 0 && !this.registerForm.hasError('mismatch')) {
      this.fromService.setUser(this.registerForm.value);
      this.fromService.getUser();
    }
  }
  // method on submit
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  //destroy the manual subscription
}
