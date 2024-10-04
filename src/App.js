// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useAuth, Authorization } from "./hooks/useAuth";
import store from "./store/store";
import Home from "./pages/home";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import VerifyCode from "./components/auth/VerifyCode";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./pages/profile/profile";
import NotFound from "./pages/notfound";
import AllTraining from "./pages/training";
import AccountDetails from "./pages/profile/accountDetails";
import Dashboard from "./pages/dashboard/dashboard";
import Exercise from "./pages/dashboard/exercise/exercise";
import SingleExercise from "./pages/dashboard/exercise/singleExercise";
import Food from "./pages/dashboard/food/food";
import SingleFood from "./pages/dashboard/food/singleFood";
import User from "./pages/dashboard/user/user";
import Workout from "./pages/dashboard/workoutPlan/workoutPlan";
import ViewUser from "./components/dashboard/user/viewUser";
import NutritionPlan from "./pages/dashboard/nutritionPlan/nutritionPlan";
import SettingPage from "./pages/dashboard/setting/setting";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<AllTraining />} />

            <Route
              path="/profile"
              element={<IsAuthenticated element={<Profile />} />}
            />
            <Route
              path="/profile/edit-profile/:id"
              element={<IsAuthenticated element={<AccountDetails />} />}
            />


            <Route path="/dashboard/exercise" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<Exercise />}
                />}
              />}
            />
            <Route path="/dashboard/single-exercise/:exerciseId" element={<SingleExercise />} />
            <Route path="/dashboard" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<Dashboard />}
                />}
              />}
            />

            <Route path="/dashboard/users" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<User />}
                />}
              />}
            />

            <Route path="/dashboard/:userId/workout-plan" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<Workout />}
                />}
              />}
            />
            <Route path="/dashboard/:userId/nutrition-plan" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<NutritionPlan />}
                />}
              />}
            />

            <Route path="/dashboard/food" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<Food />}
                />}
              />}
            />

            <Route path="/dashboard/setting" element=
              {<IsAuthenticated element=
                {<IsAuthorization element=
                  {<SettingPage />}
                />}
              />}
            />

            <Route path="/dashboard/users/:userId" element={<ViewUser />} />
            <Route path="/dashboard/food/single-food/:foodId" element={<SingleFood />} />


            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-code" element={<VerifyCode />} />
            <Route path="/auth/reset-password-request" element={<PasswordResetRequest />} />
            <Route path="/auth/reset-password/reset/:token" element={<ResetPassword />} />

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

function IsAuthenticated({ element }) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
}
function IsAuthorization({ element }) {
  const isAdmin = Authorization();
  return isAdmin ? element : <Navigate to="/" />;
}

export default App;
