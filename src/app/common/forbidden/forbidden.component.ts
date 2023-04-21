import { Component, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
constructor(public route:Router){}

innerClick(){

}

innerClickPatient(){
  this.route.navigate(['/login_page']);

}
}
