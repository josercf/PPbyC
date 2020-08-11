import * as jwt_decode from "jwt-decode";

export class JwtData {

    constructor(token?:string) {
        const jwt = jwt_decode(token);
        this.sid = jwt.sid;
        this.email = jwt.email;
        this.unique_name = jwt.unique_name;
        this.userPicture = jwt.userPicture;
        this.role = jwt.role;
    }
    unique_name: string;
    email: string;
    userPicture: string;
    sid: string;
    role: any | string[];
}