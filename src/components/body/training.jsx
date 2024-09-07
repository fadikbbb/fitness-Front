import { Link } from "react-router-dom";

function Training() {
  return (
    <div className="m-3">
      <Link to="/alltraining" className="group">
        <div className="relative z-[3] h-[200px] w-full flex items-center justify-center rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
          <div className="absolute z-[2] inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition duration-300"></div>
          <img
            className="h-full w-full absolute z-[1] object-cover"
            src="https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/05/1109-Chalk-Weightlifting-GettyImages-601821929.jpg?quality=86&strip=all"
            alt="Training"
          />
          <h3 className="relative z-[3] text-white font-bold text-xl group-hover:text-2xl transition-all duration-300">
            All Training
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default Training;
