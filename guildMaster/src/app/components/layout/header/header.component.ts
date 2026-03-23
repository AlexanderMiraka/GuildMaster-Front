import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-header',
    standalone:true,
    styleUrl: './header.component.scss',
    templateUrl:'./header.component.html',
    imports:[RouterLink]
})
export class header{}