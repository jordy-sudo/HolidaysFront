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

export type UserRole = "Empleado" | "Jefe" | "rrhh" | "Administrador";

export interface Usuarios {
    _id: string;
    name: string;
    email: string;
    ci: string;
    role: string;
    position: string;
    boss: {
      _id: string;
      name: string;
    } | null;
    isActive: boolean;
    vacationDays: number;
    country: string;
    department: string;
    area: string;
    dateOfJoining: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }


  export interface UserData {
    name: string;
    email: string;
    password: string;
    role: string;
    boss: string;
    position: string;
    vacationDays: number;
    ci: number;
    country: string;
    department: string;
    area: string;
    dateOfJoining: string; 
}