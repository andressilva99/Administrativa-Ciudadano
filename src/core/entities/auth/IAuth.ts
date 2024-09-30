//token
export interface ITokens {
    access_token: string;
}

//data
export interface IUserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    fatherName: string;
    dni: string;
    subRows: never[];
}

//signin
export interface IUserLogin {
    username: string;
    password: string;
}

export interface IPasswordChange {
    oldPassword: string;
    newPassword: string;
}

export interface IPasswordRecovery {
    email: string;
}