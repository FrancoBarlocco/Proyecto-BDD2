export class Matches {
    matchId : number;
    location : string;
    date : Date;
    localTeamResult : number;
    visitantTeamResult : number;


    constructor(matchId : number, location : string, date : Date, localTeamResult : number, visitantTeamResult : number) {
        this.matchId = matchId;
        this.location = location;
        this.date = date;
        this.localTeamResult = localTeamResult;
        this.visitantTeamResult = visitantTeamResult
    }
}