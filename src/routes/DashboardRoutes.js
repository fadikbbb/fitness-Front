import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth, RequireAdmin } from '../hooks/useAuth'; // Updated import
import Dashboard from '../pages/dashboard/dashboard';
import Exercise from '../pages/dashboard/exercise/exercise';
import SingleExercise from '../pages/dashboard/exercise/singleExercise';
import Food from '../pages/dashboard/food/food';
import SingleFood from '../pages/dashboard/food/singleFood';
import SettingPage from '../pages/dashboard/setting/setting';
import ViewUser from '../components/dashboard/user/viewUser';
import User from '../pages/dashboard/user/user';
import Workout from '../pages/dashboard/workoutPlan/workoutPlan';
import NutritionPlan from '../pages/dashboard/nutritionPlan/nutritionPlan';
import NavBar from '../components/home/navBar';
import SideBar from '../components/dashboard/sidebar';
import NotFound from "../pages/notfound";

const DashboardRoutes = () => (
    <div className="flex flex-col min-h-screen container mx-auto">
        <NavBar />
        <div className="flex flex-1">
            <SideBar />
            <div className="flex-1 md:p-6 p-2 w-[80%] bg-background overflow-y-auto">
                <Routes>
                    <Route path="/" element={
                        <RequireAuth element={
                            <RequireAdmin element={<Dashboard />} />
                        } />
                    } />
                    <Route path="/exercise" element={
                        <RequireAuth element={
                            <RequireAdmin element={<Exercise />} />
                        } />
                    } />
                    <Route path="/exercise/:exerciseId" element={
                        <RequireAuth element={
                            <RequireAdmin element={<SingleExercise />} />
                        } />
                    } />
                    <Route path="/food" element={
                        <RequireAuth element={
                            <RequireAdmin element={<Food />} />
                        } />
                    } />

                    <Route path="/setting" element={
                        <RequireAuth element={
                            <RequireAdmin element={<SettingPage />} />
                        } />
                    } />

                    <Route path="/users/:userId" element={
                        <RequireAuth element={
                            <RequireAdmin element={<ViewUser />} />
                        } />
                    } />

                    <Route path="/food/:foodId" element={
                        <RequireAuth element={
                            <RequireAdmin element={<SingleFood />} />
                        } />
                    } />

                    <Route path="/users" element={
                        <RequireAuth element={
                            <RequireAdmin element={<User />} />
                        } />
                    } />

                    <Route path="/:userId/workout-plan" element={
                        <RequireAuth element={
                            <RequireAdmin element={<Workout />} />
                        } />
                    } />

                    <Route path="/:userId/nutrition-plan" element={
                        <RequireAuth element={
                            <RequireAdmin element={<NutritionPlan />} />
                        } />
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    </div>
);

export default DashboardRoutes;
