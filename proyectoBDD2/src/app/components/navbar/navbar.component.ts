import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule],
  standalone: true
})
export class NavbarComponent {
  constructor(private router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}