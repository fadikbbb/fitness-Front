import NavBar from "../../../components/home/navBar";
import SideBar from "../../../components/dashboard/sidebar";
import FoodBody from "../../../components/dashboard/food/foodBody";
function Food() {
  return (
    <div className="flex flex-col min-h-screen container mx-auto">
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
