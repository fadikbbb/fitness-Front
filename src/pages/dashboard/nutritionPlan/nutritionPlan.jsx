import NutritionPlanBody from "../../../components/dashboard/nutritionPlan/nutritionPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/home/navBar";

function NutritionPlan() {
  return (
    <div className=" bg-gray-100">
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
