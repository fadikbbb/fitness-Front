import axios from "axios";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../../store/authSlice";
function Logout({ token }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();

  async function logoutHandler() {
    try {
      if (token) {
        const response = await axios.post(`${BASE_URL}/auth/logout`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        dispatch(clearAuthState());
      }
    } catch (error) {
      console.log(error);
    }
  }
  localStorage.removeItem("authToken");
  return (
    <button onClick={logoutHandler} className="hover:underline">
      Logout
    </button>
  );
}

export default Logout;
