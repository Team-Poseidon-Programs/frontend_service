import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface items{
  id:number;
  reason:string;
  date:string;
  submissionDate:string;
}


@Injectable({
  providedIn: 'root'
})


export class ServicenurseService {

  constructor(private http:HttpClient){}

  httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json',

    })  
  }
  postData(bp:number,rr:number,temp:number,height:number,weight:number,notes:string,bps:number,bg:string):Observable<any>{
  
    return this.http.post("http://52.190.40.95/api/VisitDetails/AddVisitDetails",
    {
      "patientId": this.myData.patientId,
      "height": height,
      "weight": weight,
      "bloodPressureSystolic": bps,
      "bloodPressureDiastolic":bp,
      "bodyTemperature":temp,
      "respirationRate": rr,
      "bloodGroup": bg,
      "nurseEmail": "string",
      "physicianEmail": this.myData.physicianEmail,
      "appointmentId": this.myData.id,
      "keyNotes": notes
    })
  }
  public getData():Observable<any>
  {
    return this.http.get("http://52.190.40.95/api/Appointment/Get_all_appointment",{headers:this.httpOptions.headers});
  }
  public serviceUrl="/api/Appointment/updatebyAppointMentNo";

  public update(data:any):Observable<any>{
      return this.http.put(`http://52.190.40.95/api/Appointment/updatebyAppointMentNo/${data.id}/${data.acceptance}`, {
        
        "reason": data.reason,
        "date": data.date,
        "acceptance": data.acceptance,
        "patientId": data.patientId,
        "physicianEmail": data.physicianEmail,
        "submissionDate": data.submissionDate
      })
  }

  public getPatientData(data:any):Observable<any>{
    
    return this.http.get(`http://52.190.40.95/api/Patient/Get_by_ID/${data}`,{headers:this.httpOptions.headers});
  }
  public getDoctorData(data:any):Observable<any>{
    return this.http.get(`http://52.190.40.95/api/Doctor/particular/${data}`,{headers:this.httpOptions.headers});

  }

  public getMedicalHistory(data:any):Observable<any> {
    return this.http.get(
      `http://52.190.40.95/api/VisitDetails/GetVisitDetailsById/${data}`
    );
  }

  public postAllergy(data:any,id:any):Observable<any>{

    return this.http.post("http://52.190.40.95/api/Allergy/Add",
    {
      "visitId": id,
      "allergyName": data,
      "notes": "none"
    })
  }

  public postBg(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddBloodGroup",{

      "patientId": this.myData.patientId,
      "date": this.myData.submissionDate,
      "value": data

    })
  }
  public postBps(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddBloodPressureSystolic",{
      "patientId": this.myData.patientId,
      "date": this.myData.submissionDate,
      "value": data
    })
  }
  
  public postBpd(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddBloodPressureDiastolic",{
      "patientId": this.myData.patientId,
      "date":this.myData.submissionDate,
      "value": data
    })
  }

  public postTemp(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddBodyTemperature",{
      "patientId": this.myData.patientId,
      "date": this.myData.submissionDate,
      "value": data
    })
  }
  public postHeight(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddHeight",{
      "patientId": this.myData.patientId,
      "date": this.myData.submissionDate,
      "value": data
    })
  }

  public postWeight(data:any):Observable<any>{
    return this.http.post("http://52.190.40.95/api/Audit/AddWeight",{
      "patientId": this.myData.patientId,
      "date":this.myData.submissionDate,
      "value": data
    })
  }

  public postResp(data:any){
    return this.http.post("http://52.190.40.95/api/Audit/AddRespiration",{
      "patientId": this.myData.patientId,
      "date": this.myData.submissionDate,
      "value": data
    })
  }
  public myData:any;
  public medPatientData:any;
}
