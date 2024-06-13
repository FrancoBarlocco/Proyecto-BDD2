export class Predict {
    UserId : number;
    MatchId : number;
    LocalTeamGoals : number;
    VisitantTeamGoals : number;
    Score : number;
    


    constructor(userId : number, matchId : number, LocalTeamGoals : number, VisitantTeamGoals : number, score : number) {
        this.UserId = userId;
        this.MatchId = matchId;
        this.LocalTeamGoals = LocalTeamGoals;
        this.VisitantTeamGoals = VisitantTeamGoals;
        this.Score = score
    }
}

