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

//register
export interface IUserRegister {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    phoneNumber: string;
    password: string;
}