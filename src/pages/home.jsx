import NavBar from "../components/partsOfpage/navbar";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { token } = location.state || {};
  return (
    <div>
      <NavBar tokenFromHome={token} />
    </div>
  );
}

export default Home;
