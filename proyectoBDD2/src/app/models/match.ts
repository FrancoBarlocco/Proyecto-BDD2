import { Team } from "./team";

export class Match {
    matchId : number;
    localTeamId: number;
    visitantTeamId: number;
    date : Date;
    stadium: number
    category: string
    localTeamResult : number;
    visitantTeamResult : number

    constructor(matchId : number, localTeamId: number, visitantTeamId: number,  date : Date, stadium: number, category: string, localTeamResult : number, visitantTeamResult : number) {
        this.matchId = matchId;
        this.localTeamId = localTeamId;
        this.visitantTeamId = visitantTeamId
        this.date = date;
        this.stadium = stadium;
        this.category = category;
        this.localTeamResult = localTeamResult;
        this.visitantTeamResult = visitantTeamResult
    }
}

