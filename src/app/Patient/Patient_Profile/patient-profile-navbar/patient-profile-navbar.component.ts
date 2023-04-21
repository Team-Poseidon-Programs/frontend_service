import { Component } from '@angular/core';
import { ServicePatientService } from '../../service-patient.service';

@Component({
  selector: 'app-patient-profile-navbar',
  templateUrl: './patient-profile-navbar.component.html',
  styleUrls: ['./patient-profile-navbar.component.css']
})
export class PatientProfileNavbarComponent {
  constructor(public service:ServicePatientService){}
  onLogout(){
    this.service.isPatientLoggedIn = false;
    console.log("logout");
  }
}
