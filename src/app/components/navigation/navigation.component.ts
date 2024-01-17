import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    if (this.userService.isAuthenticated()) {
      this.userService.logout().subscribe({
        next: () => {
          this.userService.deleteSessionInfo();
          this.isLoggedIn = false;
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
