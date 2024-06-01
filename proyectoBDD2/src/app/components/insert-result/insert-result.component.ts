import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
@Component({
  selector: 'app-insert-result',
  standalone: true,
  imports: [FormsModule, AdminNavbarComponent],
  templateUrl: './insert-result.component.html',
  styleUrl: './insert-result.component.css'
})
export class InsertResultComponent {

  matchId: string = '';
  localTeamResult: string = '';
  visitantTeamResult: string = '';
}
