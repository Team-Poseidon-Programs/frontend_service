import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { ServicePatientService } from './Patient/service-patient.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public myauth:AuthorizationService,private route:Router,public patientService:ServicePatientService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const { routeConfig } = route; 
   
   const { path } = routeConfig as Route; 

   if ((path?.includes('adminhome') || path?.includes('admin_schedule')) && (this.myauth.authour==='admin.com')) {
 
      return true;
    }

    if ((path?.includes('doctorhome') || path?.includes('doctdapp') || path?.includes('docacceptedappointments')) && (this.myauth.authour==='doctor.com')) {
 
      return true;
    }

    if ((path?.includes('nursehome') || path?.includes('nurse_appointment')) && (this.myauth.authour==='nurse.com' )) {
 
      return true;
    }
    // isPatientLoggedIn
    if((path?.includes('patient_profile') || path?.includes('patient_book_app')) && (this.patientService.isPatientLoggedIn === true)){
      return true;
    }
    this.route.navigateByUrl('/forbiddenroute'); 
    return false;
  }
  
}
