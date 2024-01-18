import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  formGroup!: FormGroup;
  user: User = {} as User;
  isDisabled = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login(): void {
    this.isDisabled = true;
    this.userService
      .login({
        email: this.formGroup.value['email'],
        password: this.formGroup.value['password'],
        username: '',
      })
      .subscribe({
        next: (response: any) => {
          this.userService.setSessionInfo(response.headers.get('session'));
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.isDisabled = false;
        },
      });
  }
}
