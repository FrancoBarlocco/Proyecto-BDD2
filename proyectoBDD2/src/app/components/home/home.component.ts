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
  predict = false;
  matchesAndTeams: MatchAndTeams[] = [];
  predictions: Predict[] = [];

  constructor(private matchService: MatchService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.matchService.getMatchesAndTeams().then((data) => {
      this.matchesAndTeams = data;
      console.log(this.matchesAndTeams);
      this.user = this.loginService.getUser();
      this.matchService.getPredictions(this.user).then((data) => {
        this.predictions = data;
        // Mapea las predicciones a los partidos
        this.matchesAndTeams.forEach(match => {
          this.predictions.forEach(element => {
            if (element.MatchId == match.MatchId) {
              match.predictionSubmitted = true;
              match.localPrediction = element.LocalTeamGoals
              match.visitantPrediction = element.VisitantTeamGoals
              match.Score = element.Score;
            }
          });
        })
      });
    }).catch((error) => {
      console.error('Error fetching matches and teams', error);
    });
  }

  isMatchTime(dateString: string): boolean {
    const matchDate = new Date(dateString);
    const now = new Date();
    const timeDiff = matchDate.getTime() - now.getTime();
    const oneHourInMs = 60 * 60 * 1000; // una hora en milisegundos

    return timeDiff < oneHourInMs;
  }

  savePredictions(matchId: number, localPrediction: number, visitantPrediction: number): void {
    this.matchService.savePredictions(this.user, matchId, localPrediction, visitantPrediction)
      .then(response => {
        if (response.success) {
          this.matchesAndTeams.forEach(match => {
            if (match.MatchId == matchId) {
              match.predictionSubmitted = true;
            }
          })
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

  validateInput(event: any) {
    const input = event.target;
    if (input.value < 0) {
      input.value = 0;
    }
  }

  onSubmit(matchId: number, localPrediction: number, visitantPrediction: number) {
    if (this.isValidPrediction(localPrediction) && this.isValidPrediction(visitantPrediction)) {
      this.savePredictions(matchId, localPrediction, visitantPrediction);
    } else {
      alert('Las predicciones deben ser números no negativos menores a 21.');
    }
  }

  isValidPrediction(value: number): boolean {
    return value >= 0 && Number.isInteger(value) && value <= 20;
  }

  modifyPrediction(match: MatchAndTeams, currentLocalPrediction: number, currentVisitantPrediction: number) {
    const userId = Number(localStorage.getItem('userId')); // Obtén el ID del usuario desde el almacenamiento local
    const matchId = match.MatchId;
    const localPrediction = currentLocalPrediction;
    const visitantPrediction = currentVisitantPrediction;
  
    // Validar predicciones
    if (!this.isValidPrediction(localPrediction) || !this.isValidPrediction(visitantPrediction)) {
      alert('Las predicciones deben ser números no negativos menores a 21.');
      return; // Salir del método si las predicciones no son válidas
    }
  
    if (localPrediction !== null && visitantPrediction !== null) {
      this.matchService.updatePredict(userId, matchId, Number(localPrediction), Number(visitantPrediction)).then(response => {
        alert('Predicción modificada correctamente!');
        console.log('Predicción modificada correctamente!', response);
        this.showPredictionInput[matchId] = false; 
        match.predictionSubmitted = true;
      }).catch(error => {
        console.error('Error al modificar la predicción', error);
        alert('Ocurrió un error al modificar la predicción');
      });
    }
  }
  // Variable para controlar la visibilidad del div de predicción
  showPredictionInput: { [key: number]: boolean } = {};

  // Método para mostrar el div de predicción
  enablePredictionInput(matchId: number) {
    this.showPredictionInput[matchId] = true;
  }

}
