import { Profile,Historial,Solicitud,Reports } from "../views";
import { Recepcion } from "../views/Recepcion";
import { Users } from "../views/Users";

type RenderComponentType = {
    [key: string]: JSX.Element;
  };
  
export const RenderComponent: RenderComponentType = {
    Solicitud: <Solicitud />,
    Profile: <Profile />,
    History: <Historial />,
    Reports: <Reports />,
    Recepcion: <Recepcion />,
    Historial: <Historial />,
    Users: <Users />,
  };
  