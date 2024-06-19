// src/app/info/info.component.ts
import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { Fixture } from '../../models/fixture';
import { Stadium } from '../../models/stadium';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/stadium.service';

@Component({
  selector: 'app-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule],

})
export class InfoComponent implements OnInit {
  fixtures!: Fixture[];
  stadiums!: Stadium[];

  constructor(private infoService: InfoService, private stadiumService: StudentService) { }

  ngOnInit(): void {
    this.fixtures = this.infoService.getFixtures();

    this.stadiumService.getStadiums().subscribe({
      next: (data: Stadium[]) => {
        this.stadiums = data;
      },
      error: (error) => {
        console.error('Error cargando estadios', error);
      }
    });
  }
}
