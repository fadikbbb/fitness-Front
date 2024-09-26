import NutritionPlanBody from "../../../components/dashboard/nutritionPlan/nutritionPlanBody";
import SideBar from "../../../components/dashboard/sidebar";
import Navbar from "../../../components/header/navBar";

function NutritionPlan() {
  return (
    <div>
      <Navbar />
      <SideBar />
      <NutritionPlanBody />
    </div>
  );
}
export default NutritionPlan;
