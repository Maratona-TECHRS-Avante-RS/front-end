import { createBrowserRouter } from "react-router-dom";
import {
  HelpScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  DetailsHelpScreen,
  EditHelpScreen,
  MyHelpsScreen,
} from "../ui/screens";
import { PrivateRoute } from "./private-route.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/registrar",
    element: <RegisterScreen />,
  },
  {
    path: "/home",
    element: <PrivateRoute Screen={HomeScreen} />,
  },
  {
    path: "/perfil",
    element: <PrivateRoute Screen={ProfileScreen} />,
  },
  {
    path: "/pedir-ajuda",
    element: <PrivateRoute Screen={HelpScreen} />,
  },
  {
    path: `/visualizar-ajuda/:id`,
    element: <PrivateRoute Screen={DetailsHelpScreen} />,
  },
  {
    path: `/editar-ajuda/:id`,
    element: <PrivateRoute Screen={EditHelpScreen} />,
  },
  {
    path: `/meus-pedidos/`,
    element: <PrivateRoute Screen={MyHelpsScreen} />,
  },
]);
