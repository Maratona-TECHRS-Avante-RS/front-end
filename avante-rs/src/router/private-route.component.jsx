import { Navigate } from "react-router-dom";
import { useGlobalUser } from "../context";
import { Nav } from "../ui/components";

export function PrivateRoute({ Screen }) {
  const [user] = useGlobalUser();

  if (user) {
    return (
      <>
        <div className="screen-container-default">
          <Screen />
        </div>
        <Nav />
      </>
    );
  }
  return <Navigate to={"/"} />;
}
