import { Component} from "@angular/core";
import { RegisterUser } from "../forms/auth/register/register-user.component";
import { LoginUser } from "../forms/auth/login/login-user.component";
@Component({
    standalone:true,
    templateUrl:'./auth.pages.html',
    styleUrl:'./auth.pages.scss',
    imports:[RegisterUser,LoginUser],
})
export class UserAuth{
    mode:string = 'register';
    updateMode(value:string) {
        this.mode = value;
    }
}