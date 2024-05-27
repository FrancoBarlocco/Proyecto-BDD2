export class Match {
    matchId : number;
    location : string;
    date : Date;
    localTeamResult : number;
    visitantTeamResult : number
    localTeamId: number;
    visitantTeamId: number;

    constructor(matchId : number, location : string, date : Date, localTeamResult : number, visitantTeamResult : number, localTeamId: number, visitantTeamId: number) {
        this.matchId = matchId;
        this.location = location;
        this.date = date;
        this.localTeamResult = localTeamResult;
        this.visitantTeamResult = visitantTeamResult
        this.localTeamId = localTeamId;
        this.visitantTeamId = visitantTeamId;
    }
}