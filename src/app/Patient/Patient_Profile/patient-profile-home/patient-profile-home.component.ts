import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-patient-profile-home',
  templateUrl: './patient-profile-home.component.html',
  styleUrls: ['./patient-profile-home.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PatientProfileHomeComponent {
  public showChatbot = false;

  public toggleChatbot(): void {
    this.showChatbot = !this.showChatbot;
  }
}
