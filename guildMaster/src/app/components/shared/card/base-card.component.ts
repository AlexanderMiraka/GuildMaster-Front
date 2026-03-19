import { Component } from "@angular/core";
@Component({
    standalone:true,
    selector:'card-title',
    template:`<ng-content></ng-content>`,
})
export class CardTitle{}
@Component({
    standalone:true,
    selector:'card-content',
    template:`<ng-content></ng-content>`,
})
export class CardContent{}
@Component({
    standalone:true,
    selector:'card-actions',
    template:`<ng-content></ng-content>`,
})
export class CardActions{}

@Component({
    standalone:true,
    imports:[CardTitle,CardContent,CardActions],
    selector:'base-card',
    templateUrl:'./base-card.component.html',
    styleUrl:'./base-card.component.scss',
})
export class BaseCard{}