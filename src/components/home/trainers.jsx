import { useRef, useState } from "react";

function Trainers() {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollLeft = () => {
    if (currentIndex > 0 && !isScrolling) {
      setIsScrolling(true);
      scrollToCard(currentIndex - 1);
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  const handleScrollRight = () => {
    if (
      currentIndex < scrollContainerRef.current.children.length - 1 &&
      !isScrolling
    ) {
      setIsScrolling(true);
      scrollToCard(currentIndex + 1);
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  const scrollToCard = (index) => {
    if (
      scrollContainerRef.current &&
      scrollContainerRef.current.children[index]
    ) {
      scrollContainerRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full h-full  text-center relative">
      <div className="w-full flex flex-col justify-center py-10">
        <h1 className="text-4xl font-bold mb-8">Our Trainers</h1>

        {/* Scroll Arrows */}

        {/* Trainer Cards */}
        <div
          ref={scrollContainerRef}
          className="w-full flex overflow-x-auto gap-6 scrollbar-hide"
        >
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="min-w-full md:min-w-[calc(33%-2rem)] p-4 shadow-lg mr-2 my-4 rounded-lg"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIisj4rujYEbEYq_InnadT5V1UzedpJt3FMA&s"
                  alt={`Trainer ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg mb-4"
                />
                <h2 className="text-3xl mb-2">Trainer {index + 1}</h2>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quasi at quibusdam, fugiat, mollitia recusandae nulla
                  numquam animi magni alias vero ducimus qui inventore suscipit
                  velit porro ad in eius.
                </p>
              </div>
            ))}
        </div>
        <div className="w-full flex justify-center gap-7">
          <button
            onClick={handleScrollLeft}
            className=" w-10 h-10 bg-[rgba(0,0,0,0.5)] text-white rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={handleScrollRight}
            className="w-10 h-10 bg-[rgba(0,0,0,0.5)] text-white rounded-full"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trainers;
