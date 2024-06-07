export class Student {
    Ci: Number;
    FirstName : string;
    LastName : string;
    Email : string;
    Password : string
    ChampionTeamID : string
    SubChampionTeamId : string
    Contact : string

    constructor(ci: Number, firstName : string, lastName : string, email : string, password : string, championTeamID : string, subChampionTeamId : string, Contact : string) {
        this.Ci = ci;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Password = password;
        this.ChampionTeamID = championTeamID
        this.SubChampionTeamId = subChampionTeamId
        this.Contact = Contact
    }
}
