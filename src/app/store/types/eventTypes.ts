export interface User {
    _id: string;
    name: string;
    ci: string; 
    position: string; 
    boss: User; 
    country: string; 
    department: string; 
    area: string; 
    dateOfJoining: string; 
    vacationDays:number;
  }
  
  export interface Event {
    title: string;
    start: string;
    end: string;
    approved: boolean;
    hasPdfDocument: boolean;
    requestedDays: number;
    user: User;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
  
  export interface EventResponse {
    ok: boolean;
    eventos: Event[];
  }
  
  export interface EventError {
    ok: boolean;
    msg: string;
  }
  
  export interface EventUpdate{
    camp:string;
    newStatus:Boolean;
  }

  export interface EventCreate {
    title: string;
    start: string;
    end: string;
    approved: boolean;
    hasPdfDocument: boolean;
    requestedDays: number;
    user: string;
    ci: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
  