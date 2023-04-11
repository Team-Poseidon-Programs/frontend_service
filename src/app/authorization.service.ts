import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import Auth0Lock from 'auth0-lock'
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  adminRoute:boolean=false;
  authour:string;

  constructor(public route:Router,private auth:AuthService) { }


 
  public email:any;
  public isAuthenticated:boolean;

  public AuthorizeFunc(email:any){
    // this.email = email;
    console.log(email);
    this.authour=email;
    if(email==='admin.com'){
      this.adminRoute = true;
      
      // this.lock.getUserInfo()
    }
    else{
      this.adminRoute=false;
    }
}


}
