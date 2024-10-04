function About() {
  return (
    <div className="m-4 p-2">
        <h1 className="text-4xl font-bold mb-8 text-center text-text">About</h1>
      <div className="flex  flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(50%-2rem)]">
          <img className="h-20" src="../../../muscle.gif" alt="" />
          <h1 className="text-3xl font-bold mb-8 text-center text-text">
            workoutplan
          </h1>
          <p className="text-sm text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            obcaecati laboriosam amet sunt iusto repudiandae quidem in explicabo
            vero quia nesciunt autem aspernatur iure ducimus. Quas corrupti
            quisquam a ut.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(50%-2rem)] ">
          <img className="h-20" src="../../../handshake.gif" alt="" />
          <h1 className="text-3xl font-bold mb-8 text-center text-text">
            fitnessplan
          </h1>
          <p className="text-sm text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            obcaecati laboriosam amet sunt iusto repudiandae quidem in explicabo
            vero quia nesciunt autem aspernatur iure ducimus. Quas corrupti
            quisquam a ut.
          </p>
        </div>
        <div className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(50%-2rem)]">
          <img className="h-20" src="../../../heartbeat.gif" alt="" />
          <h1 className="text-3xl font-bold mb-8 text-center text-text">
            nutritionplan
          </h1>
          <p className="text-sm text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            obcaecati laboriosam amet sunt iusto repudiandae quidem in explicabo
            vero quia nesciunt autem aspernatur iure ducimus. Quas corrupti
            quisquam a ut.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
