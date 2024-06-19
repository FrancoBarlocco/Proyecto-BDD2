export class Team {
    TeamId: number;
    Name: string;
    Flag: string;

    constructor(teamId: number, name: string, flag: string) {
        this.TeamId = teamId;
        this.Name = name;
        this.Flag = flag
    }
}