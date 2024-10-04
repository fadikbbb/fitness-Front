import NutritionPlanBody from "../../../components/dashboard/nutritionPlan/nutritionPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";

function NutritionPlan() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="w-[80%] ">
          <NutritionPlanBody />
        </div>
      </div>
    </div>
  );
}
export default NutritionPlan;
