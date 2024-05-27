/*export class Student {
    ci: Number;
    firstName : string;
    lastName : string;
    email : string;
    password : string
    championTeamID : string
    subChampionTeamId : string

    constructor(ci: Number, firstName : string, lastName : string, email : string, password : string, championTeamID : string, subChampionTeamId : string) {
        this.ci = ci;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.championTeamID = championTeamID
        this.subChampionTeamId = subChampionTeamId
    }
}*/
// src/app/models/student.model.ts
export class Student {
    constructor(public name: string, public points: number) {}
  }
  
