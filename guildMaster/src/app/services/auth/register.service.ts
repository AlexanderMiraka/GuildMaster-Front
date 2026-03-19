import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { user } from "../../interfaces/user/user";
@Injectable({
    providedIn:'root'
})

export class registerService{
    private userRegistered!: user;

    setUser(user:user):void {
        this.userRegistered = user;
    }
    getUser():user {
        return this.userRegistered;
    }
    registerUser():void {
        //make the POST request to back end
        const user:user = {...this.getUser()};
        console.log(user);
    }
}