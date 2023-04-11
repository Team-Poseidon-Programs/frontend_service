import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';


export interface customer_complaint {
  patientEmail: string,
  complaint: string,
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class HelpbotServiceService {

  complaints: customer_complaint = {
    patientEmail: '',
    complaint: '',
    date: ''
  }

  constructor(private httpclient: HttpClient) { }

  getcomplaintbyEmail(email: string): Observable<customer_complaint[]>
  {
    return this.httpclient.get<customer_complaint[]>(`https://localhost:7292/poseidonhc/getcomplaintbyEmail/${email}`)
  }

  getallComplain():Observable<customer_complaint[]>
  {
    return this.httpclient.get<customer_complaint[]>('https://localhost:7292/poseidonhc/GetallCompalins')
  }
  
  addComplaint(complaint: any) {

    console.log(complaint);
    
    this.complaints.patientEmail = complaint.patientEmail;
    this.complaints.complaint = complaint.complaint;
    this.complaints.date = complaint.date;

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.complaints);

    return this.httpclient.post('https://localhost:7292/poseidonhc/addComplaint', body, { headers: headers })
  }

}
