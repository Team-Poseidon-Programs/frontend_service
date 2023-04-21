import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePatientService } from '../../service-patient.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-login-form-component',
  templateUrl: './login-form-component.component.html',
  styleUrls: ['./login-form-component.component.css'],
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
export class LoginFormComponentComponent {
  public showPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ServicePatientService,
    private snackbar: MatSnackBar
  ) {}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(f: NgForm) {
    console.log(f);
    this.service
      .tryLogin(f)
      .pipe(
        catchError((error) => {
          const statusCode = error.status;
          console.log('failed');
          return throwError(error);
        })
      )
      .subscribe((response) => {
        localStorage.setItem('LoggedInUserId', response.toString());

        // This is where you can handle the successful response
        console.log('success');

        if (response != 0) {
          this.snackbar.open('Successfully Logged in', 'Ok', {
            duration: 3000,
          });
          this.service.isPatientLoggedIn =true;
          this.router.navigate(['patient_profile']);
        } else {
          this.snackbar.open('Logged in failed', 'Ok', {
            duration: 3000,
          });
          this.router.navigate(['login_page']);
        }
      });
  }

  getValue(f: any) {}

  public showChatbot = false;

  public toggleChatbot(): void {
    this.showChatbot = !this.showChatbot;
  }
}
