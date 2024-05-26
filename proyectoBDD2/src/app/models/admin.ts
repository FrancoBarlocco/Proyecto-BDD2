export class Admin {
    ci: Number;
    firstName : string;
    lastName : string;
    email : string;
    password : string

    constructor(ci: Number, firstName : string, lastName : string, email : string, password : string) {
        this.ci = ci;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}


