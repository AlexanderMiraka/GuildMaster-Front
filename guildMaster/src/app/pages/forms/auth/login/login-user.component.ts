import { Component, EventEmitter, Output } from '@angular/core';
import {
  BaseCard,
  CardTitle,
  CardContent,
  CardActions,
} from '../../../../components/shared/card/base-card.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  ValidationErrors,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { userAuth } from '../../../../interfaces/user/authUser';
@Component({
  standalone: true,
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss',
  selector: 'login-user',
  imports: [BaseCard, CardTitle, CardContent, CardActions, ReactiveFormsModule],
})
export class LoginUser {
  @Output() login = new EventEmitter<string>();
  switchTab() {
    this.login.emit('register');
  }
  loginForm: FormGroup;
  hasError:boolean = false;
  constructor() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
      }
    );
    //subscribe to the observable and use takeUntilDestoryed 
    // to automatically unsubscribe and check if the user changed the value
    // of the inputs
    this.loginForm.valueChanges.pipe(takeUntilDestroyed()).subscribe({
        next: ()=> {
            this.hasError = false;
        },
        error: () => {
            this.hasError = true;
        }
    })//this is to couple data with the interface to send it to the service
    let userLoginForm!: userAuth;
  }
  //event when the user clicks the submit form button
  loginUser(){
    const email = this.loginForm.get('email')?.value;
    const username = this.loginForm.get('username')?.value;
    if(email==='' && username==='') {
        this.hasError = true;
    }
  }
}
