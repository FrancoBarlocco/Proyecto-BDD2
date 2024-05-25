export class Team {
    teamId : number;
    name : string;
    flag : ImageBitmap;

    constructor(teamId : number, name : string, flag : ImageBitmap) {
        this.teamId = teamId;
        this.name = name;
        this.flag = flag
    }
}