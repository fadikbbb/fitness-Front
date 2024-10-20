import React from "react";
import { Route, Routes } from "react-router-dom";
import SingleExerciseView from "../pages/userView/workoutPlan/singleExercise";
import SingleFoodView from "../pages/userView/nutritionPlan/singleFood";
import ViewWorkout from "../pages/userView/workoutPlan/userWorkoutPlan";
import ViewNutrition from "../pages/userView/nutritionPlan/userNutritionPlan";
import AccountDetails from "../pages/userView/profile/accountDetails";
import NavBar from "../components/home/navBar";
import { RequireAuth } from "../hooks/useAuth"; // Updated import
import NotFound from "../pages/notfound";
import WeeklyReport from "../components/userViewComponents/weeklyReport/weeklyReportForm";

const UserRoutes = () => (
  <div>
    <NavBar />
    <Routes>
      <Route
        path="/workout-plan/:userId/exercises/:exerciseId"
        element={<RequireAuth element={<SingleExerciseView />} />}
      />
      <Route
        path="/nutrition-plan/:userId/food/:foodId"
        element={<RequireAuth element={<SingleFoodView />} />}
      />
      <Route
        path="/profile/edit-profile/:userId"
        element={<RequireAuth element={<AccountDetails />} />}
      />
      <Route
        path="/workout-plan/:userId"
        element={<RequireAuth element={<ViewWorkout />} />}
      />
      <Route
        path="/nutrition-plan/:userId"
        element={<RequireAuth element={<ViewNutrition />} />}
      />
      <Route 
      path="/weekly-reports/:userId"
      element={<RequireAuth element={<WeeklyReport />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default UserRoutes;
