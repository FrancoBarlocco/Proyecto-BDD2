import { Component } from '@angular/core';
import { statisticService } from '../../services/statistic.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  
})
export class StatisticsComponent {
  
  statistics: { [career: string]: { exact: number, correct: number, failed: number } } = {};

  constructor(private statisticService : statisticService){}

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics(){
    this.statisticService.getStatisticsByCareer().subscribe(
      (data) => {
        this.statistics = data;
        console.log(this.statistics)
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }
  getCareers(): string[] {
    return Object.keys(this.statistics);
  }
}

