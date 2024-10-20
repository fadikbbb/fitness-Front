import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import UserRoutes from "./routes/UserRoutes";
import { fetchUser } from "./store/userSlice";
import { fetchAllSettings } from "./store/settingsSlice";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); // Assuming you have auth state for userId

  useEffect(() => {
    dispatch(fetchAllSettings());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId)); // Pass userId here
    }
  }, [dispatch, userId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
