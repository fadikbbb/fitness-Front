import NavBar from "../components/header/navBar";
import { Link } from "react-router-dom";
function AllTraining() {
  const training = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <NavBar />
      <section>
        <nav className="category ">
          <ul className="flex justify-evenly">
            <Link to="/" className="">
              <li>lats</li>
            </Link>
            <Link to="/training" className="">
              <li>cardio</li>
            </Link>
            <Link to="/training" className="">
              <li>biceps</li>
            </Link>
            <Link to="/training" className="">
              <li>triceps</li>
            </Link>
          </ul>
        </nav>
        <main>
          {training.map((training) => (
            <div
              key={training}
              className="exercise w-full min-h-40 flex justify-evenly items-center"
            >
              <img
                className="min-h-[70%]"
                src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRcgiCMkudOZaHmpglW2lQhk0yZPWuZ0tlNReLbmMZk9x6JjHj0k9NaRU3UfAFHosu4kPhJEKl9L56cSQSs&s=19"
                alt=""
              />
              <div className="sm:flex justify-evenly items-center sm:w-full">
                <h3 className="title text-2xl sm:w-1/2">
                  dfgdfg dfg dfg df df dfgdfg df dfg dfgdf dfg df df gdfg dfgdfg
                </h3>
                <h5 className="calories mx-2"> 50-100calories/min</h5>
                <h5 className="level mx-2"> Beginner</h5>
                <button className="button">view</button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}

export default AllTraining;
