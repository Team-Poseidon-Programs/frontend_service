import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';


export interface Patient_Info {
  id: number,
  email: string,
  title: string,
  firstName: string,
  lastName: string,
  dob: string,
  contactNumber: string,
  password: string,
  gender: string,
  address: string
}

export interface add_doctors {
  email: string,
  name: string,
  dept: string
}

export interface physician_Available {
  physician_email: string,
  availablefrom: string,
  availableTo: string
}

export interface getDocbyEmail {
  email: string,
  name: string,
  dept: string
}

export interface getAvailableDoc {
  doctorEmail: string,
  availableFrom: string,
  availableTo: string,
  scheduleStatus: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  doctors: add_doctors = {
    email: '',
    name: '',
    dept: ''
  }

  physician_avail: physician_Available = {
    physician_email: '',
    availablefrom: '',
    availableTo: ''
  }

  doctor_avail_status: getAvailableDoc =
    {
      doctorEmail: '',
      availableFrom: '',
      availableTo: '',
      scheduleStatus: false
    }

  constructor(private httpclient: HttpClient) { }

  private _refreshRequired = new Subject<void>();

  getRefresfRequired()
  {
    return this._refreshRequired;
  }

  // get all patients for admin
  getallPatients(): Observable<Patient_Info[]> {
    return this.httpclient.get<Patient_Info[]>('https://52.190.40.95/api/Patient/Get_all_Patient');
  }

  // get all available doctors
  getAvailableDoctor(): Observable<getAvailableDoc[]> {
    return this.httpclient.get<getAvailableDoc[]>('https://52.190.40.95/api/DoctorAvailblity/getdocbyStatus/false');
  }

  // get all available doctors
  getAvailableDoctorbyStatus(): Observable<getAvailableDoc[]> {
    return this.httpclient.get<getAvailableDoc[]>('https://52.190.40.95/api/DoctorAvailblity/getdocbyStatus/true');
  }

  // get doctors by email
  getDoctorsbyEmail(email: string): Observable<getDocbyEmail> {
    return this.httpclient.get<getDocbyEmail>(`https://52.190.40.95/api/Doctor/particular/${email}`)
  }

  // get available doctors by email
  getDoctorsAvailablebyEmail(email: string): Observable<getAvailableDoc> {
    return this.httpclient.get<getAvailableDoc>(`https://52.190.40.95/api/DoctorAvailblity/particular/${email}`)
  }

  getPhysicianAvailablebyEmail(email: string): Observable<physician_Available>{
    return this.httpclient.get<physician_Available>(`https://52.190.40.95/api/PhysicianAvailability/FindDoctorByEmailID/${email}`)
  }

  // add doctor to physician availability
  addphysicalAvailability(physician: any) {
    this.physician_avail.physician_email = physician.physician_email;
    this.physician_avail.availablefrom = physician.availablefrom;
    this.physician_avail.availableTo = physician.availableTo;

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.doctors);

    return this.httpclient.post('https://52.190.40.95/api/PhysicianAvailability/AddPhysicianAvailable', physician, { headers: headers })
  }

  // update doctor availability status
  updateDocAvailStatus(doctor: any) {
    this.doctor_avail_status.doctorEmail = doctor.doctorEmail;
    this.doctor_avail_status.availableFrom = doctor.availableFrom;
    this.doctor_avail_status.availableTo = doctor.availableTo;
    this.doctor_avail_status.scheduleStatus = doctor.scheduleStatus;

    console.log("doctor avail status");

    console.log(this.doctor_avail_status);

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.doctor_avail_status);

    console.log("body");

    console.log(body);

    return this.httpclient
    .put('https://52.190.40.95/api/DoctorAvailblity/Update/' + this.doctor_avail_status.doctorEmail, body, { headers: headers })
    .pipe(
      tap(() => {
      this._refreshRequired.next();
    }))
  }

  updatePhysicianAvailability(physician: any)
  {
    this.physician_avail.physician_email = physician.physician_email;
    this.physician_avail.availablefrom = physician.availablefrom;
    this.physician_avail.availableTo = physician.availableTo;

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.physician_avail);

    return this.httpclient
    .put('https://52.190.40.95/api/PhysicianAvailability/UpdatePhysicianavailability/' + this.physician_avail.physician_email, body, {headers: headers})
    .pipe(
      tap(() => {
        this._refreshRequired.next();
      })
    )
  }

  deletePhysicianAvailability(email: string)
  {
    return this.httpclient.delete('https://52.190.40.95/api/PhysicianAvailability/DeletephysicianAvailability/' + email)
  }

  // add doctors
  addDoctors(doctor: any) {
    this.doctors.email = doctor.email;
    this.doctors.name = doctor.name;
    this.doctors.dept = doctor.dept

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.doctors);

    return this.httpclient.post('https://52.190.40.95/api/Doctor/Add', body, { headers: headers })

  }

  addAvailability(email : string){
    this.doctor_avail_status.doctorEmail = email;
    this.doctor_avail_status.availableFrom = "none";
    this.doctor_avail_status.availableTo = "none";
    this.doctor_avail_status.scheduleStatus = false;

    const headers = { 'content-type': 'application/json' };
    const body1 = JSON.stringify(this.doctor_avail_status);

    // console.log(this.doctor_avail_status);
    
    // console.log(body1);

    return this.httpclient.post('https://52.190.40.95/api/DoctorAvailblity/Add', body1, {headers: headers})

  }
}
