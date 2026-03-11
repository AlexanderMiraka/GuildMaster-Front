import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class registerService{
    private userRegistered:[] = [];

    setUser(user:[]):void {
        this.userRegistered = user;
    }
    getUser():[] {
        console.log(this.userRegistered);
        return [...this.userRegistered];
    }
    registerUser():void {
        //make the POST request to back end
    }
}