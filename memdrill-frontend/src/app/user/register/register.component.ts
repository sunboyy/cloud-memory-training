import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';

  message = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }
    this.userService.register(this.username, this.password).subscribe((result) => {
      if (result.success) {
        this.router.navigate(['auth', 'login']);
      } else {
        this.message = result.error;
      }
    });
  }
}
