import NutritionPlanBody from "../../../components/dashboard/nutritionPlan/nutritionPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/header/navBar";

function NutritionPlan() {
  return (
    <div className=" bg-gray-100">
      <Navbar />
      <div className="flex ">
        <SideBar />
        <div className="w-[80%] bg-background overflow-y-auto">
          <NutritionPlanBody />
        </div>
      </div>
    </div>
  );
}
export default NutritionPlan;
