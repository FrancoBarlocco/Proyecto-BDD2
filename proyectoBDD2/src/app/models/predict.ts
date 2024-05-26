export class Predict {
    userId : number;
    matchId : number;
    teamAGoals : number;
    teamBGoals : number;
    score : number;


    constructor(userId : number, matchId : number, teamAGoals : number, teamBGoals : number, score : number) {
        this.userId = userId;
        this.matchId = matchId;
        this.teamAGoals = teamAGoals;
        this.teamBGoals = teamBGoals;
        this.score = score
    }
}

