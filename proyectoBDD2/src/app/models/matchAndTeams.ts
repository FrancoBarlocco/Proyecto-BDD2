export interface MatchAndTeams {
  MatchId: number;
  StadiumId: number;
  Date: string;
  LocalTeamResult: number;
  VisitantTeamResult: number;
  LocalTeamId: number;
  LocalTeamName: string;
  LocalTeamFlag: string;
  VisitantTeamId: number;
  VisitantTeamName: string;
  VisitantTeamFlag: string;
  localPrediction: number;
  visitantPrediction: number;
  predictionSubmitted: boolean;
  Category : string;
  Score : number;
  StadiumName: string;
}