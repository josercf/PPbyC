


import { JwtData } from "./claim";

export class Identity {

    constructor(authenticated?: boolean, created?: Date, expiration?: Date, accessToken?: string, refreshToken?: string, message?: string) {
        this.Authenticated = authenticated;
        this.Created = created;
        this.Expiration = expiration;
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.Message = message;
    }
    Authenticated: boolean;
    Created: Date;
    Expiration: Date;
    AccessToken: string;
    RefreshToken: string;
    Message: string;

    getJwtData() {
        return new JwtData(this.AccessToken);
    }
}