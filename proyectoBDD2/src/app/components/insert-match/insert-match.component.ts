import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert-match',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, FormsModule],
  templateUrl: './insert-match.component.html',
  styleUrl: './insert-match.component.css'
})
export class InsertMatchComponent {
  localTeam: string =''
  visitantTeam: string = '';
  date: Date = new Date('0000-00-00T00:00:00');
  city: string = '';
  stadium: string = '';
}
