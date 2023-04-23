import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appointments } from './appointments';
import { TestDetail } from './services/doctor/UpdateMedInfo/doc-med-info-edit-dialog/doc-med-info-edit-dialog.component';
import { TestDetail1 } from './services/doctor/UpdateMedInfo/doc-add-test-dialog/doc-add-test-dialog.component';
import { Prescription } from './services/doctor/UpdateMedInfo/doc-med-info-add-prescription-dialog/doc-med-info-add-prescription-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  Doctor_name:any;
  appointment_num:number;
  TestId:number;
  VisitId:number;
  pageRefresh:boolean = false;
  PatientId:number;
  EmailPatientId:number;
  constructor(private http:HttpClient) { }

  urlAppointment = "https://localhost:7292/poseidonhc";
  
  // This service is to get all the patient appointment details based on acceptance number and doctor email id.
  public GetAppointmentsByAceptanceEmail(id:Number,email:String):Observable<any>{
    const url = `https://52.172.14.117/api/Appointment/AcceptanceAndEmail/${id}/${email}`;
    return this.http.get<any>(url);
  }

  // https://localhost:7292/poseidonhc/Get_by_ID/11
  // This service is to get the patient detila based on their patient id.
  public GetPatientDetailsByID(id:Number):Observable<any>{
    const url = `https://52.172.14.117/api/Patient/Get_by_ID/${id}`
    return this.http.get<any>(url);
  }

  // https://localhost:7267/api/Appointment/updatebyAppointMentNo/4/0
  // https://localhost:7292/poseidonhc/updatebyAppointMentNo/4/1

  public PutAcceptancebyId(id:Number,Acceptance:Number):Observable<any>{
    const url = `https://52.172.14.117/api/Appointment/updatebyAppointMentNo/${id}/${Acceptance}`;
    return this.http.put<any>(url,null);
    
  }

  // https://localhost:7292/poseidonhc/GetByDateAcceptanceNoDoctorEmail?AcceptanceId=3&Date=23%2F03%2F2022&DoctorEmail=test%40gmail.com
  public GetByAcceptanceDoctorEmailDate(AcceptanceNo:number,Date:string,DoctorEmail:string){
    const ogDate = Date.replace("/" ,"%2F")
    const ogDocMail = DoctorEmail.replace(/@/g,"%40")
    const url = `https://52.172.14.117/api/Appointment/GetByDateAcceptanceNoDoctorEmail?AcceptanceId=${AcceptanceNo}&Date=${ogDate}&DoctorEmail=${ogDocMail}`;
    return this.http.get<any>(url);
  }

  // https://localhost:7292/poseidonhc/GetVisitDetailsByAcceptanceId/43
  public GetVisitDetailsByAcceptanceId(AcceptanceID:number){
    const url = `https://52.172.14.117/api/VisitDetails/GetVisitDetailsByAcceptanceId/${AcceptanceID}`;
    return this.http.get<any>(url);
  }

  // https://localhost:7292/poseidonhc/allery/84

  public GetAllergyDetailsByVisitID(VisitId:number){
    const url = `https://52.172.14.117/api/Allergy/Fetch/${VisitId}`;
    return this.http.get<any>(url);
  }

  // https://localhost:7292/poseidonhc/GetTestListbyid/84
  public GetTestResultsByVisitId(VisitId:number){
    const url = `https://52.172.14.117/api/Test/GetTestListbyid/${VisitId}`
    return this.http.get<any>(url);
  }

  // public putContacts(contact:contact,id:any):Observable<any>{
  //   const url = `https://localhost:7118/UpdateContacts/${id}`
  //   return this.http.put<any>(url,contact)
  // }
  // https://localhost:7102/api/Test/UpdateTest/14

  public PutUpdateTest(TestID:number,TestDetail:TestDetail){

    const url = `https://52.172.14.117/api/Test/UpdateTest/${TestID}`
    return this.http.put<any>(url,TestDetail);


  }

  public DeleteTest(testID:number){
    const url = `https://52.172.14.117/api/Test/DeleteTest/${testID}`
    return this.http.delete<any>(url);
  }

  // /poseidonhc/AddTest
  public AddTest(TestDetails:TestDetail1){
    const url = `https://52.172.14.117/api/Test/AddTest`
    return this.http.post<any>(url,TestDetails);
  }

  // /poseidonhc/GetPrescriptionById/{id}

  public ViewPrescription(VisitID:number){
    const url = `https://52.172.14.117/api/Prescription/GetPrescriptionById/${VisitID}`;
    return this.http.get<any>(url);
  }
  // /poseidonhc/AddPrescription

  public AddPriscription(Pres:Prescription){
    const url = `https://52.172.14.117/api/Prescription/AddPrescription`
    return this.http.post<any>(url,Pres);
  }

  // /poseidonhc/Get_by_ID/{id}

  public GetPatientById(patId:number){
    const url = `https://52.172.14.117/api/Patient/Get_by_ID/${patId}`;
    return this.http.get<any>(url);
  }

 
  // poseidonhc/GetVisitDetailsById/{id}

  public GetVisitByPatientId(patId:number){
    const url = `https://52.172.14.117/api/VisitDetails/GetVisitDetailsById/${patId}`;
    return this.http.get<any>(url);

  }

  // public GetVisitDetailsById(){
  //   const url = `${this.urlAppointment}`;
  //   return
  // }
  
  // /poseidonhc/sendEmail/{email}/{status}

  public EmailSender(Email:string,Status:number){
    const url = `https://52.172.14.117/api/EmailSender/sendEmail/${Email}/${Status}`
    return this.http.post<any>(url,null);
  }

  // https://localhost:7119/api/Doctor/particular/anu.general%40doctor.com
  // Get_particular_doctor/{email}

  public GetDoctorDetails(Email:string){
    const ogDocMail = Email.replace(/@/g,"%40")
    const url = `https://52.172.14.117/api/Doctor/particular/${ogDocMail}`;
    return this.http.get<any>(url);
  }

  // /poseidonhc/FindDoctorByEmailID/{EmailID}

  public GetDoctorAvailablityByEmail(Email:string){
    const ogDocMail = Email.replace(/@/g,"%40")
    const url = `https://52.172.14.117/api/PhysicianAvailability/FindDoctorByEmailID/${ogDocMail}`;
    return this.http.get<any>(url);

  }
}
