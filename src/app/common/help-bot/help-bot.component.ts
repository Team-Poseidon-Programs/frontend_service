import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import moment from 'moment';
import { HelpbotServiceService, customer_complaint } from './helpbot-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-help-bot',
  templateUrl: './help-bot.component.html',
  styleUrls: ['./help-bot.component.css']
})
export class HelpBotComponent implements OnInit {

  constructor(private service: HelpbotServiceService,
    private router: Router) {}

  cus_complain: customer_complaint = {
    patientEmail: '',
    complaint: '',
    date: ''
  } 

  email: string;
  complain: string;

  ngOnInit(): void {
    
   
  }

  todaydate: Date;

  tdate: string;

  onSubmit()
  {
    console.log(this.email);
    console.log(this.complain);

    this.todaydate = new Date();
    this.tdate = moment(this.todaydate).format('DD/MM/YYYY');    

    this.cus_complain.patientEmail = this.email;
    this.cus_complain.complaint = this.complain;
    this.cus_complain.date = this.tdate;
    
    this.service.addComplaint(this.cus_complain).subscribe(res => {
      console.log(res);

      this.router.navigateByUrl('', {skipLocationChange: true}).then(() => 
      {
        this.router.navigate(['login_page'])
      })
    })
  }

  switch_exp: number;
  patient_switchexp: number;
  login_switchexp: number;
  page_switchexp: number;
  data_switchexp: number;
  doc_switchexp: number;

  value: number;

  submit(val: number) {
    this.switch_exp = val;
  }

  patient(val: number) {
    this.patient_switchexp = val;

  }

  login_problem(val: number) {
    this.login_switchexp = val;
  }

  page_problem(val: number) {
    this.page_switchexp = val;
  }

  data_problem(val: number) {
    this.data_switchexp = val;
  }

  doc_problem(val: number) {
    this.doc_switchexp = val;
  }

}
