import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
  imports: [NavbarComponent],
  standalone:true
})
export class TermsComponent {

  constructor(private router: Router) {}

  accept() {
    this.router.navigate(['/home']); 
  }
}
