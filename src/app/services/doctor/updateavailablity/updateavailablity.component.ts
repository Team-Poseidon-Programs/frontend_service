import { Component } from '@angular/core';
import { DocUpdateAvailabilityComponent } from '../doc-update-availability/doc-update-availability.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/doctor.service';


@Component({
  selector: 'app-updateavailablity',
  templateUrl: './updateavailablity.component.html',
  styleUrls: ['./updateavailablity.component.css']
})
export class UpdateavailablityComponent {

  doctorDetails:any;
  doctorAvailablity:any;

  constructor(public dialog:MatDialog,public doc:DoctorService){}


  ngOnInit(){
    console.log(this.doc.Doctor_name)
    this.doc.GetDoctorDetails(this.doc.Doctor_name).subscribe(response =>{
      console.log(response);
      this.doctorDetails = response;
    })

    this.doc.GetDoctorAvailablityByEmail(this.doc.Doctor_name).subscribe(Response =>{
      console.log(Response);
      this.doctorAvailablity = Response;
    })
  }
  add_available()
  {
    const dRef = this.dialog.open(DocUpdateAvailabilityComponent, {
      width: '500px',
      data: { }
    });
  }

}
