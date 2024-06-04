import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/team';
import { MatchAndTeams } from '../../models/matchAndTeams';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import LoginService from '../../services/login.service';
import { Predict } from '../../models/predict';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, CommonModule, FormsModule],
  standalone: true
})
export class HomeComponent implements OnInit {

  user: any;

  matchesAndTeams: MatchAndTeams[] = [];

  constructor(private matchService: MatchService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.matchService.getMatchesAndTeams().then((data) => {
      this.matchesAndTeams = data;
    }).catch((error) => {
      console.error('Error fetching matches and teams', error);
    });

    this.user = this.loginService.getUser();
    console.log(this.user.Ci);
    this.matchService.getPredictions(this.user.Ci).then((predictions: Predict[]) => {
      // Mapea las predicciones a los partidos
      this.matchesAndTeams.forEach(match => {
        const prediction = predictions.find((p: Predict) => p.matchId === match.MatchId);
        console.log(prediction?.teamAGoals);
        if (prediction) {
          console.log(prediction.teamAGoals);
          match.localPrediction = prediction.teamAGoals;
          match.visitantPrediction = prediction.teamBGoals;
        }
      });
    });
    

  }

  savePredictions(matchId: number, localPrediction: number, visitantPrediction: number): void {
    this.matchService.savePredictions(this.user.Ci, matchId, localPrediction, visitantPrediction)
      .then(response => {
        if (response.success) {
          console.log('Predictions saved successfully.');
          // Recargar los datos después de guardar las predicciones
          this.matchService.getMatchesAndTeams();
        } else {
          console.error('Failed to save predictions:', response.error);
        }
      })
      .catch(error => {
        console.error('Error saving predictions:', error);
      });
  }
}