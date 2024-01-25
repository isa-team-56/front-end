import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  passwordMismatch: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  register(): void {
    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
    };

    if (this.registrationForm.valid) {
      const password = this.registrationForm.value.password;
      const confirmPassword = this.registrationForm.value.confirmPassword;

      if (password === confirmPassword) {
        this.passwordMismatch = false;
        this.authService.register(registration).subscribe({
          next: (response) => {
            
            this.ngZone.run(() => {
              alert('Registration successful!'); 
            });

            this.router.navigate(['home']);
          },
        });
      } else {
        this.passwordMismatch = true;
      }
    }
  }
}
