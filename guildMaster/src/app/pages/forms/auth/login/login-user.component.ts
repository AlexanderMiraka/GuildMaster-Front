import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    standalone:true,
    templateUrl:'./login-user.component.html',
    styleUrl:'./login-user.component.scss',
    selector:'login-user',
})
export class LoginUser{
    @Output() login= new EventEmitter <string> ();
    switchTab() {
        this.login.emit('register');
    }
}