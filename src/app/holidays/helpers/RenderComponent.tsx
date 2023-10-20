import { Profile,Historial,Solicitud,Reports } from "../views";
import { ListPersonal } from "../views/ListPersonal";
import { Recepcion } from "../views/Recepcion";
import { SolicitudesPersonal } from "../views/SolicitudesPersonal";
import { Users } from "../views/Users";

type RenderComponentType = {
    [key: string]: JSX.Element;
  };
  
export const RenderComponent: RenderComponentType = {
    Solicitud: <Solicitud />,
    SolicitudesPersonal: <SolicitudesPersonal />,
    ListPersonal:<ListPersonal/>,
    Profile: <Profile />,
    History: <Historial />,
    Reports: <Reports />,
    Recepcion: <Recepcion />,
    Historial: <Historial />,
    Users: <Users />,
  };
  