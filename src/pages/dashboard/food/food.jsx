import NavBar from "../../../components/home/navBar";
import SideBar from "../../../components/dashboard/sidebar";
import FoodBody from "../../../components/dashboard/food/foodBody";
function Food() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="w-[80%] bg-background overflow-y-auto">
          <FoodBody />
        </div>
      </div>
    </div>
  );
}

export default Food;
