export class Predict {
    UserId : number;
    MatchId : number;
    TeamAGoals : number;
    TeamBGoals : number;
    Score : number;
    


    constructor(userId : number, matchId : number, teamAGoals : number, teamBGoals : number, score : number) {
        this.UserId = userId;
        this.MatchId = matchId;
        this.TeamAGoals = teamAGoals;
        this.TeamBGoals = teamBGoals;
        this.Score = score
    }
}

