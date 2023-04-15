import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { availability } from './Book_Appointment/pat-appointment-content/pat-appointment-content.component';

export interface patientObj {
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  contactNumber: string;
  password: string;
  gender: string;
  address: string;
}
export interface getPatientObj {
  Id: number;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  contactNumber: string;
  password: string;
  gender: string;
  address: string;
}

export interface items {
  id: number;
  reason: string;
  date: string;
  acceptance: number;
  //physicianEmail:string;
  submissionDate: string;
}

export interface loginDetails {
  Email: string;
  password: string;
}

export interface appointment {
  reason: string;
  date: string;
  acceptance: number;
  patientId: number;
  physicianEmail: string;
  submissionDate: string;
}

export interface reason {
  reason: string;
}

export interface test {
  id: number;
  visitDetailsId: number;
  testName: string;
  result: string;
  notes: string;
}

export interface vitals {
  [x: string]: any;
  bp: string;
  temp: string;
  ht: string;
  wt: string;
  spo2: string;
  allergies: string;
}

export interface visitDetail {
  id: number;
  patientId: number;
  height: number;
  weight: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bodyTemperature: number;
  respirationRate: number;
  bloodGroup: string;
  nurseEmail: string;
  physicianEmail: string;
  appointmentId: number;
  keyNotes: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServicePatientService {
  constructor(private http: HttpClient) {}

  // VARIABLE DECLARATIONS

  currentUser: any;
  patientData: patientObj;
  email: string;
  password: string;
  testList: any = [];
  tList: any = [];
  newVitals: any;
  newAllergy: any;

  patientDet: patientObj = {
    email: '',
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    contactNumber: '',
    password: '',
    gender: '',
    address: '',
  };
  updatedPatient: getPatientObj = {
    Id: 0,
    email: '',
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    contactNumber: '',
    password: '',
    gender: '',
    address: '',
  };

  currentAppointment: appointment = {
    reason: '',
    date: '',
    acceptance: 0,
    patientId: 0,
    physicianEmail: '',
    submissionDate: '',
  };

  currentVitals: vitals = {
    bp: '',
    temp: '',
    ht: '',
    wt: '',
    spo2: '',
    allergies: '',
  };

  // FOR AUTO REFRESH OF VIEW AFTER DB UPDATE
  private _refreshRequired = new Subject<void>();

  getRefreshRequired() {
    return this._refreshRequired;
  }

  //RootURLS
  rootURL = 'https://localhost:7102/api';
  appointmentRootUrl = 'https://localhost:7267/api/Appointment/';
  physicianAvaRootUrl = 'https://localhost:7140/api/PhysicianAvailability/';
  AllergyRootUrl = 'https://localhost:7182/api';
  EmailServiceRoot = 'https://localhost:7292';

  //NEW PATIENT REGISTRATION
  addPatient(patient: any) {
    this.patientDet.firstName = patient.firstName;
    this.patientDet.lastName = patient.lastName;
    this.patientDet.title = patient.title;
    this.patientDet.contactNumber = patient.contactNumber;
    this.patientDet.address = patient.address;
    this.patientDet.password = patient.password;
    this.patientDet.dob = patient.dob;
    this.patientDet.gender = patient.gender;
    this.patientDet.email = patient.email;
    localStorage.setItem('currentUserEmail', patient.email);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.patientDet);
    console.log(body);
    return this.http
      .post('https://52.190.40.95/api/Patient/Add_Patient', body, { headers: headers })
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }

  //DETAILS FOR PROFILE PAGE AFTER LOGIN
  getDetailsForProfile(id: number) {
    return this.http.get<patientObj>('https://52.190.40.95/api/Patient/Get_by_ID/' + id);
  }

  //UPDATE USER DETAILS
  updatePersonalDetails(id: number, updatedDetails: any) {
    var headers;
    var body;
    console.log('update call');
    headers = { 'content-type': 'application/json' };
    body = JSON.stringify(updatedDetails);
    console.log(body);

    console.log(body);
    return this.http
      .put('https://52.190.40.95/api/Patient/Update_Patient/' + id, body, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshRequired.next();
        })
      );
  }
  //LOGIN
  tryLogin(details: any) {
    this.email = details.Email;
    this.password = details.password;
    localStorage.setItem('currentUserEmail', this.email);
    return this.http.get<number>(
      'https://52.190.40.95/api/Patient/patientLogin/' + this.email + '/' + this.password
    );
  }

  //APPOINTMENT HISTORY
  public getAppointmentHistory(id: number): Observable<any> {
    return this.http.get('https://52.190.40.95/api/Appointment/GetbyPatientID/' + id);
  }

  //AVAILABLE DOCTORS LIST
  public getAllAvailableDoctors() {
    return this.http.get('https://52.190.40.95/api/PhysicianAvailability/Get_All_Physicians');
  }

  public setAppointments(appointmentData: appointment) {
    this.currentAppointment.submissionDate = appointmentData.submissionDate;
    this.currentAppointment.date = appointmentData.date;
    this.currentAppointment.patientId = appointmentData.patientId;
    this.currentAppointment.physicianEmail = appointmentData.physicianEmail;
    this.currentAppointment.acceptance = appointmentData.acceptance;
  }

  public bookAppointment(reason: any) {
    this.currentAppointment.reason = reason.reason;
    var headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(this.currentAppointment);
    return this.http.post('https://52.190.40.95/api/Appointment/Add_appointment', body, {
      headers: headers,
    });
  }

  public getMedicalHistory() {
    var currentUserId = JSON.parse(localStorage.getItem('LoggedInUserId')!);
    return this.http.get('https://52.190.40.95/api/VisitDetails/GetVisitDetailsById/' + currentUserId);
  }

  public getTestForAVisit(id: number) {
    return this.http.get('https://52.190.40.95/api/Test/GetTestListbyid/' + id);
  }

  public getPrescription(id: number) {
    return this.http.get('https://52.190.40.95/api/Prescription/GetPrescriptionById/' + id);
  }

  public getVitals(id: number) {
    return this.http.get<visitDetail>('https://52.190.40.95/api/VisitDetails/GetParticularVisitDetailsById/' + id);
  }

  public getAllergies(id: number) {
    return this.http.get('https://52.190.40.95/api/Allergy/Fetch/' + id);
  }

  public sendBookedEmail() {
    var headers = { 'content-type': 'application/json' };
    var body = '';
    var toMail = localStorage.getItem('currentUserEmail');
    return this.http.post('https://52.190.40.95/api/EmailSender/sendEmail/' + toMail + '/' + 0,
      body,
      { headers: headers }
    );
  }

  public isExistEmail(email: string) {
    return this.http.get('https://52.190.40.95/api/Patient/PatientExist/' + email);
  }
  public isExistPhone(phone: string) {
    return this.http.get('https://52.190.40.95/api/Patient/phoneNo/isExist/' + phone);
  }
}
