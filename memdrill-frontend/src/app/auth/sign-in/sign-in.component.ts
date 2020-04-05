import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe((success) => {
      if (success) {
        this.router.navigate(['']);
      } else {
        this.message = 'Login failed';
      }
    });
  }
}
