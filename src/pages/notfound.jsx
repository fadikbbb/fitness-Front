import NotFoundBody from "../components/notfound/not-found-body";
import { Navigate } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <Navigate to="/" />
      <NotFoundBody />
    </div>
  );
}

export default NotFound;
