import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocUpdateAvailabilityComponent } from '../doc-update-availability/doc-update-availability.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent {

  constructor(private dialog: MatDialog,private router:Router,private auth:AuthService) { }

  ngOnInit(){
    console.log(this.auth.getAccessTokenSilently.toString);
    this.auth.user$.subscribe(response =>{
      console.log(response);

      this.auth.getAccessTokenSilently
    })

  

  }


  add_available()
  {
    // const dRef = this.dialog.open(DocUpdateAvailabilityComponent, {
    //   width: '500px',
    //   data: { }
    // });

    this.router.navigate(['/docotorupdateavailablity']);
  }

  to_accpetedAppointment(){
    this.router.navigate(['docacceptedappointments']);
  }

  to_pendingAppointment(){
    this.router.navigate(['doctdapp']);

  }



}
