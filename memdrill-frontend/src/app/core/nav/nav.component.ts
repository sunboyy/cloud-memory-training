import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
