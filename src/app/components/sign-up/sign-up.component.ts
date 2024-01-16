import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formGroup!: FormGroup;
  user: User = {} as User;
  isDisabled = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  createNewUser(): void {
    this.isDisabled = true;
    this.userService
      .createUser({
        email: this.formGroup.get('email')?.value,
        username: this.formGroup.get('username')?.value,
        password: this.formGroup.get('password')?.value,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          console.log(response?.headers);
          this.userService.setSessionInfo(response.headers.get('session'));
          this.router.navigate(['/']);
        },
        error: (e: Error) => {
          console.log('Error:', e);
        },
        complete: () => {
          this.isDisabled = false;
        },
      });
  }
}
