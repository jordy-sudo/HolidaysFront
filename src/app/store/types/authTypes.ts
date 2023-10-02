export interface AuthResponse {
    ok: boolean;
    uid: string;
    name: string;
    token: string;
    role: string;
    msg: string;
    position:string;
    department:string;
    email:string;
}
export interface Credentials {
    email: string;
    password: string;
}