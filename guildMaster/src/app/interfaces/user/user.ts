import { userAuth } from "./authUser";


export interface user extends userAuth {
firstName:string;
lastName:string;
bio:string;
dob:string;//dd-mm-yyyy
profession:string;
}