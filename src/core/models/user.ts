
export class User {
    constructor(email?: string, password?: string) {

        this.Email = email;
        this.Password = password;
    }


    PhoneNumber?: string;
    NormalizedEmail?: string;
    Email?: string;
    NormalizedUserName?: string;
    UserName?: string;
    Id?: string;
    Name?: string;
    Password?: string;
    ConfirmPassword?: string;

}
